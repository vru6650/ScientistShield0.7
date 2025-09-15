<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scientist Shield v0.4 - Interactive Project Overview</title>
    <!-- Chosen Palette: Warm Neutrals -->
    <!-- Application Structure Plan: The application is designed as a single-page dashboard with a fixed sidebar for navigation. This structure was chosen to allow users to non-linearly explore different facets of the project documentation. Instead of a static, top-to-bottom read, users can instantly jump to the section that interests them most (e.g., Tech Stack, Setup Guide). Key interactions include clickable cards for features, an interactive bubble chart for the tech stack, and collapsible accordions for the setup guide and file structure. This design prioritizes user-driven exploration and quick information retrieval over passive reading. -->
    <!-- Visualization & Content Choices: 
        - Key Features: README List -> Goal: Organize/Inform -> Method: Interactive Cards -> Interaction: Click to expand details. Justification: More engaging than a list, allows users to focus on one feature at a time. Method: HTML/Tailwind/JS.
        - Tech Stack: README List -> Goal: Show Relationships/Organize -> Method: Bubble Chart -> Interaction: Hover for tooltips. Justification: Visually represents the project's ecosystem and the relationship between frontend/backend tech. Library: Chart.js (Canvas).
        - Setup Guide: README Steps -> Goal: Inform/Organize -> Method: Accordion -> Interaction: Click to expand/collapse steps. Justification: Condenses a long list of instructions into a manageable, step-by-step flow. Method: HTML/Tailwind/JS.
        - Project Structure: README pre-formatted text -> Goal: Organize -> Method: Interactive File Tree -> Interaction: Click to expand/collapse folders. Justification: A direct, interactive simulation of browsing the project's directory. Method: HTML/Tailwind/JS.
    -->
    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #FDFBF8; }
        @import url('https://rsms.me/inter/inter.css');
        .nav-item.active { background-color: #4A5568; color: #FFFFFF; }
        .feature-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .feature-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); }
        .tech-bubble:hover { transform: scale(1.1); }
        .accordion-content { max-height: 0; overflow: hidden; transition: max-height 0.5s ease-in-out; }
        .file-tree-item { cursor: pointer; }
        .file-tree-item ul { display: none; }
        .file-tree-item.open > ul { display: block; }
        .content-section { display: none; }
        .content-section.active { display: block; }
    </style>
</head>
<body class="text-gray-800">
    <div class="flex min-h-screen">
        <!-- Sidebar Navigation -->
        <aside class="w-64 bg-gray-800 text-white p-6 fixed h-full">
            <h1 class="text-2xl font-bold mb-8">Scientist Shield</h1>
            <nav id="sidebar-nav">
                <ul>
                    <li><a href="#overview" class="nav-item block py-2 px-4 rounded transition-colors duration-200 hover:bg-gray-700">🚀 Overview</a></li>
                    <li><a href="#features" class="nav-item block py-2 px-4 rounded transition-colors duration-200 hover:bg-gray-700">✨ Key Features</a></li>
                    <li><a href="#tech-stack" class="nav-item block py-2 px-4 rounded transition-colors duration-200 hover:bg-gray-700">💻 Tech Stack</a></li>
                    <li><a href="#setup" class="nav-item block py-2 px-4 rounded transition-colors duration-200 hover:bg-gray-700">🛠️ Setup Guide</a></li>
                    <li><a href="#structure" class="nav-item block py-2 px-4 rounded transition-colors duration-200 hover:bg-gray-700">📂 Project Structure</a></li>
                </ul>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="ml-64 flex-1 p-10">
            <!-- Overview Section -->
            <section id="overview" class="content-section">
                <h2 class="text-4xl font-extrabold mb-4">Project Overview</h2>
                <p class="text-lg text-gray-600 mb-8">This interactive application provides a dynamic way to explore the Scientist Shield v0.4 project. Instead of a static document, you can use the sidebar to navigate through interactive modules that break down the project's features, technology, and setup process.</p>
                <div class="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                    <h3 class="text-2xl font-bold mb-4">About The Project</h3>
                    <p class="text-gray-700 leading-relaxed">The goal of Scientist Shield is to provide a seamless and engaging experience for developers of all levels. Whether you're reading an in-depth article, taking an interactive quiz, or debugging code step-by-step, the platform offers the tools you need to succeed. It's built to be robust, scalable, and user-friendly, with a modern UI and a powerful set of features.</p>
                </div>
            </section>

            <!-- Key Features Section -->
            <section id="features" class="content-section">
                <h2 class="text-4xl font-extrabold mb-4">Key Features</h2>
                 <p class="text-lg text-gray-600 mb-8">Click on any feature card below to expand it and learn more about its capabilities. This section highlights the core functionalities that make Scientist Shield a comprehensive platform for developers.</p>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div class="feature-card bg-white p-6 rounded-xl shadow-md border border-gray-200 cursor-pointer" data-feature="cms">
                        <h3 class="text-xl font-bold mb-2">Content Management System</h3>
                        <p class="text-gray-600">Create, manage, and publish educational content like posts, tutorials, and quizzes.</p>
                    </div>
                    <div class="feature-card bg-white p-6 rounded-xl shadow-md border border-gray-200 cursor-pointer" data-feature="editor">
                        <h3 class="text-xl font-bold mb-2">Interactive Code Editor</h3>
                        <p class="text-gray-600">A multi-language editor with live previews and backend execution.</p>
                    </div>
                    <div class="feature-card bg-white p-6 rounded-xl shadow-md border border-gray-200 cursor-pointer" data-feature="visualizer">
                        <h3 class="text-xl font-bold mb-2">Advanced Execution Visualizer</h3>
                        <p class="text-gray-600">Step-by-step debugging for Python and JavaScript with advanced tooling.</p>
                    </div>
                    <div class="feature-card bg-white p-6 rounded-xl shadow-md border border-gray-200 cursor-pointer" data-feature="auth">
                        <h3 class="text-xl font-bold mb-2">User Authentication & Management</h3>
                        <p class="text-gray-600">Secure JWT-based authentication with OAuth 2.0 and role-based access control.</p>
                    </div>
                    <div class="feature-card bg-white p-6 rounded-xl shadow-md border border-gray-200 cursor-pointer" data-feature="ui">
                        <h3 class="text-xl font-bold mb-2">Modern UI/UX</h3>
                        <p class="text-gray-600">A responsive, themeable interface built with React and Tailwind CSS.</p>
                    </div>
                </div>
            </section>

            <!-- Tech Stack Section -->
            <section id="tech-stack" class="content-section">
                <h2 class="text-4xl font-extrabold mb-4">Tech Stack Explorer</h2>
                <p class="text-lg text-gray-600 mb-8">This interactive chart visualizes the technology ecosystem of Scientist Shield. Each bubble represents a technology, color-coded by its category (Frontend, Backend, or Development). Hover over a bubble to see its name and role in the project.</p>
                <div class="chart-container bg-white p-6 rounded-xl shadow-md border border-gray-200 w-full max-w-4xl mx-auto h-[60vh] max-h-[600px] relative">
                    <canvas id="techStackChart"></canvas>
                </div>
            </section>

            <!-- Setup Guide Section -->
            <section id="setup" class="content-section">
                <h2 class="text-4xl font-extrabold mb-4">Setup Guide</h2>
                <p class="text-lg text-gray-600 mb-8">Follow these steps to get a local copy of the project up and running on your machine. Click on each step to expand it and view the detailed instructions and commands.</p>
                <div id="setup-accordion" class="space-y-4">
                     <div class="accordion-item bg-white rounded-xl shadow-md border border-gray-200">
                        <h3 class="accordion-header p-6 cursor-pointer font-bold text-lg flex justify-between items-center">Prerequisites <span>▼</span></h3>
                        <div class="accordion-content px-6 pb-6">
                            <ul class="list-disc list-inside text-gray-700">
                                <li>Node.js (v18 or later)</li>
                                <li>npm (v9 or later)</li>
                                <li>MongoDB (local installation or a cloud instance like MongoDB Atlas)</li>
                            </ul>
                        </div>
                    </div>
                    <div class="accordion-item bg-white rounded-xl shadow-md border border-gray-200">
                        <h3 class="accordion-header p-6 cursor-pointer font-bold text-lg flex justify-between items-center">1. Clone the Repository <span>▼</span></h3>
                        <div class="accordion-content px-6 pb-6">
                            <code class="block bg-gray-100 p-4 rounded-md text-gray-800">git clone https://github.com/vru6650/ScientistShield0.4.git
cd ScientistShield0.4</code>
</div>
</div>
<div class="accordion-item bg-white rounded-xl shadow-md border border-gray-200">
<h3 class="accordion-header p-6 cursor-pointer font-bold text-lg flex justify-between items-center">2. Setup the Backend (api) <span>▼</span></h3>
<div class="accordion-content px-6 pb-6 space-y-3">
<p>Navigate to the `api` directory and install dependencies:</p>
<code class="block bg-gray-100 p-4 rounded-md text-gray-800">cd api
npm install</code>
<p>Create a `.env` file in the `api` directory and add your environment variables:</p>
<code class="block bg-gray-100 p-4 rounded-md text-gray-800">MONGO_URI=&lt;YOUR_MONGODB_CONNECTION_STRING&gt;
JWT_SECRET=&lt;YOUR_JWT_SECRET_KEY&gt;</code>
<p>Start the backend server (runs on `http://localhost:3000`):</p>
<code class="block bg-gray-100 p-4 rounded-md text-gray-800">npm run dev</code>
</div>
</div>
<div class="accordion-item bg-white rounded-xl shadow-md border border-gray-200">
<h3 class="accordion-header p-6 cursor-pointer font-bold text-lg flex justify-between items-center">3. Setup the Frontend (client) <span>▼</span></h3>
<div class="accordion-content px-6 pb-6 space-y-3">
<p>In a new terminal, navigate to the `client` directory and install dependencies:</p>
<code class="block bg-gray-100 p-4 rounded-md text-gray-800">cd client
npm install</code>
<p>Start the frontend development server (runs on `http://localhost:5173`):</p>
<code class="block bg-gray-100 p-4 rounded-md text-gray-800">npm run dev</code>
</div>
</div>
</div>
</section>

            <!-- Project Structure Section -->
            <section id="structure" class="content-section">
                <h2 class="text-4xl font-extrabold mb-4">Project Structure</h2>
                <p class="text-lg text-gray-600 mb-8">Explore the project's architecture by interacting with the file tree below. Click on any directory to expand or collapse its contents and understand how the files are organized.</p>
                <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200 font-mono text-sm">
                    <ul class="file-tree">
                        <li class="file-tree-item open">
                            <span class="font-bold">📁 /</span>
                            <ul>
                                <li class="file-tree-item open ml-4">
                                    <span class="font-bold">📁 api/</span>
                                    <ul class="ml-4">
                                        <li><span>📁 controllers/</span></li>
                                        <li><span>📁 models/</span></li>
                                        <li><span>📁 routes/</span></li>
                                        <li><span>📁 utils/</span></li>
                                        <li><span>📄 index.js</span></li>
                                    </ul>
                                </li>
                                <li class="file-tree-item open ml-4">
                                    <span class="font-bold">📁 client/</span>
                                    <ul class="ml-4">
                                        <li><span>📁 public/</span></li>
                                        <li class="file-tree-item">
                                            <span>📁 src/</span>
                                            <ul class="ml-4">
                                                <li><span>📁 components/</span></li>
                                                <li><span>📁 hooks/</span></li>
                                                <li><span>📁 pages/</span></li>
                                                <li><span>📁 redux/</span></li>
                                                <li><span>📁 services/</span></li>
                                                <li><span>📄 App.jsx</span></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const navLinks = document.querySelectorAll('#sidebar-nav a');
            const contentSections = document.querySelectorAll('.content-section');

            function updateActiveState() {
                const hash = window.location.hash || '#overview';
                
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === hash) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });

                contentSections.forEach(section => {
                    if ('#' + section.id === hash) {
                        section.classList.add('active');
                    } else {
                        section.classList.remove('active');
                    }
                });
            }

            window.addEventListener('hashchange', updateActiveState);
            updateActiveState();

            // Feature Cards Logic
            const featureCards = document.querySelectorAll('.feature-card');
            const featureDetails = {
                cms: `
                    <ul class="list-disc list-inside mt-4 text-gray-700">
                        <li>Create, edit, and publish blog <strong>Posts</strong> with a rich-text editor.</li>
                        <li>Design interactive, multi-chapter <strong>Tutorials</strong>.</li>
                        <li>Build engaging <strong>Quizzes</strong> to test user knowledge.</li>
                        <li>Full administrative dashboard for managing users, posts, comments, and other content.</li>
                    </ul>`,
                editor: `
                     <ul class="list-disc list-inside mt-4 text-gray-700">
                        <li>A multi-file, multi-language code editor supporting HTML, CSS, JS, Python, and C++.</li>
                        <li>Live preview for web technologies and backend execution for other languages.</li>
                        <li>Customizable editor settings (theme, font size, etc.) and a VS Code-style command palette.</li>
                    </ul>`,
                visualizer: `
                     <ul class="list-disc list-inside mt-4 text-gray-700">
                        <li>Step-by-step debugging of Python and JavaScript code.</li>
                        <li>Support for <strong>breakpoints</strong> and <strong>standard input (stdin)</strong>.</li>
                        <li>Interactive data structure visualization using a force-directed graph (D3.js).</li>
                        <li>Shareable links to specific code execution sessions.</li>
                    </ul>`,
                auth: `
                     <ul class="list-disc list-inside mt-4 text-gray-700">
                        <li>Secure JWT-based authentication with password hashing (bcryptjs).</li>
                        <li>OAuth 2.0 integration for easy sign-in with Google.</li>
                        <li>Role-based access control (Admin vs. User).</li>
                    </ul>`,
                ui: `
                     <ul class="list-disc list-inside mt-4 text-gray-700">
                        <li>Built with <strong>React</strong> and styled with <strong>Tailwind CSS</strong>.</li>
                        <li>Engaging animations and micro-interactions using <strong>Framer Motion</strong>.</li>
                        <li>A responsive, themeable interface (Light & Dark modes).</li>
                    </ul>`
            };
            
            featureCards.forEach(card => {
                const featureKey = card.dataset.feature;
                const detailsHTML = featureDetails[featureKey];
                const detailsContainer = document.createElement('div');
                detailsContainer.className = 'accordion-content';
                detailsContainer.innerHTML = detailsHTML;
                card.appendChild(detailsContainer);

                card.addEventListener('click', () => {
                    const content = card.querySelector('.accordion-content');
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                });
            });

            // Setup Accordion Logic
            document.querySelectorAll('#setup-accordion .accordion-header').forEach(header => {
                header.addEventListener('click', () => {
                    const content = header.nextElementSibling;
                    const item = header.parentElement;
                    const arrow = header.querySelector('span');

                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                        arrow.style.transform = 'rotate(0deg)';
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                        arrow.style.transform = 'rotate(180deg)';
                    }
                });
            });

            // Project Structure Tree Logic
            document.querySelectorAll('.file-tree-item > span').forEach(span => {
                span.addEventListener('click', () => {
                    const item = span.parentElement;
                    if (item.querySelector('ul')) {
                        item.classList.toggle('open');
                    }
                });
            });

            // Tech Stack Chart.js Logic
            const techData = {
                labels: ['React', 'Node.js', 'MongoDB', 'Tailwind', 'Express', 'Vite', 'Redux', 'Monaco Editor', 'D3.js', 'Framer Motion'],
                datasets: [{
                    label: 'Tech Stack',
                    data: [
                        { label: 'React.js', v: 20, category: 'Frontend' },
                        { label: 'Node.js', v: 20, category: 'Backend' },
                        { label: 'MongoDB', v: 18, category: 'Backend' },
                        { label: 'Tailwind CSS', v: 16, category: 'Frontend' },
                        { label: 'Express.js', v: 18, category: 'Backend' },
                        { label: 'Vite', v: 14, category: 'Development' },
                        { label: 'Redux', v: 15, category: 'Frontend' },
                        { label: 'Monaco Editor', v: 12, category: 'Frontend' },
                        { label: 'D3.js', v: 12, category: 'Frontend' },
                        { label: 'Framer Motion', v: 10, category: 'Frontend' },
                    ],
                    backgroundColor: (ctx) => {
                        const category = ctx.raw.category;
                        if (category === 'Frontend') return 'rgba(59, 130, 246, 0.7)';
                        if (category === 'Backend') return 'rgba(16, 185, 129, 0.7)';
                        if (category === 'Development') return 'rgba(249, 115, 22, 0.7)';
                        return 'rgba(107, 114, 128, 0.7)';
                    },
                    borderColor: (ctx) => {
                         const category = ctx.raw.category;
                        if (category === 'Frontend') return 'rgba(59, 130, 246, 1)';
                        if (category === 'Backend') return 'rgba(16, 185, 129, 1)';
                        if (category === 'Development') return 'rgba(249, 115, 22, 1)';
                        return 'rgba(107, 114, 128, 1)';
                    },
                    borderWidth: 2,
                }]
            };

            const techStackCtx = document.getElementById('techStackChart').getContext('2d');
            new Chart(techStackCtx, {
                type: 'bubble',
                data: techData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.raw.label;
                                }
                            }
                        }
                    },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    },
                     parsing: {
                        xAxisKey: 'v',
                        yAxisKey: 'v',
                        bubbleRadiusKey: 'v'
                    }
                }
            });
        });
    </script>
</body>
</html>
# ScientistShield0.5
# ScientistShield0.6
# ScientistShield0.7
# ScientistShield0.7
