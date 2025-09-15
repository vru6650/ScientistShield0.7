import sys
import json
import io

traces = []
stack = []
target_file = None


def tracefunc(frame, event, arg):
    if frame.f_code.co_filename != target_file:
        return None
    if event == 'call':
        stack.append(frame.f_code.co_name)
        traces.append({
            'event': 'call',
            'func': frame.f_code.co_name,
            'line': frame.f_lineno,
            'stack': list(stack),
            'locals': {k: repr(v) for k, v in frame.f_locals.items() if k != '__builtins__'},
        })
        return tracefunc
    elif event == 'line':
        traces.append({
            'event': 'line',
            'line': frame.f_lineno,
            'stack': list(stack),
            'locals': {k: repr(v) for k, v in frame.f_locals.items() if k != '__builtins__'},
        })
        return tracefunc
    elif event == 'return':
        traces.append({
            'event': 'return',
            'func': frame.f_code.co_name,
            'line': frame.f_lineno,
            'stack': list(stack),
            'return': repr(arg),
        })
        if stack:
            stack.pop()
        return tracefunc
    else:
        return tracefunc

def main(script_path):
    global traces, stack, target_file
    traces = []
    stack = []
    target_file = script_path
    with open(script_path, 'r') as f:
        code = f.read()
    stdout_buffer = io.StringIO()
    sys.stdout = stdout_buffer
    sys.settrace(tracefunc)
    status = 'ok'
    error = ''
    try:
        exec(compile(code, script_path, 'exec'), {})
    except Exception as e:
        status = 'error'
        error = str(e)
    finally:
        sys.settrace(None)
        sys.stdout = sys.__stdout__
    result = {
        'status': status,
        'stdout': stdout_buffer.getvalue(),
        'traces': traces
    }
    if status == 'error':
        result['error'] = error
    print(json.dumps(result))

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(json.dumps({'status': 'error', 'error': 'No script path provided', 'traces': [], 'stdout': ''}))
    else:
        main(sys.argv[1])