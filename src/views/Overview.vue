<template>
    <div class="overview-container">
        <div class="welcome-section">
            <h1>Dashboard Overview</h1>
            <p>Welcome to your admin dashboard. The sidebar and content area are now properly responsive.</p>
        </div>

        <div class="test-content">
            <div class="content-card">
                <h2>Responsive Layout Test</h2>
                <ul>
                    <li><strong>Desktop (>650px):</strong> Sidebar pushes content, doesn't overlay</li>
                    <li><strong>Mobile (≤650px):</strong> Sidebar overlays content when open</li>
                    <li><strong>Toggle:</strong> Sidebar can expand (220px) or collapse (60px) on desktop</li>
                    <li><strong>Mobile Menu:</strong> Hamburger button appears on mobile to toggle sidebar</li>
                </ul>
            </div>

            <div class="content-card">
                <h2>Content Visibility</h2>
                <p>This content should always remain visible and accessible, regardless of sidebar state.</p>
                <div class="demo-grid">
                    <div class="demo-item">Item 1</div>
                    <div class="demo-item">Item 2</div>
                    <div class="demo-item">Item 3</div>
                    <div class="demo-item">Item 4</div>
                </div>
            </div>

            <div class="content-card">
                <h2>Scrollable Content</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Overview'
}
</script>

<style scoped>
.overview-container {
    max-width: 1200px;
    margin: 0 auto;
}

.welcome-section {
    margin-bottom: 30px;
}

h1 {
    font-size: 5rem;
    color: var(--text-normal);
    margin-bottom: 15px;
}

.welcome-section p {
    font-size: 3rem;
    color: var(--text-light);
    line-height: 1.6;
}

.test-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.content-card {
    background: var(--white);
    border-radius: 8px;
    padding: 25px;
    box-shadow: var(--shadow);
    border: 1px solid var(--soft-gray);
}

.content-card h2 {
    font-size: 4rem;
    color: var(--deep-blue);
    margin-bottom: 15px;
}

.content-card p, .content-card li {
    font-size: 2.8rem;
    color: var(--text-normal);
    line-height: 1.6;
    margin-bottom: 10px;
}

.content-card ul {
    padding-left: 20px;
    margin: 15px 0;
}

.content-card li {
    margin-bottom: 8px;
}

.demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-top: 20px;
}

.demo-item {
    background: var(--cool-white);
    border: 2px solid var(--deep-blue);
    border-radius: 6px;
    padding: 20px;
    text-align: center;
    font-size: 2.8rem;
    font-weight: 600;
    color: var(--deep-blue);
    transition: transform 0.2s ease;
}

.demo-item:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow);
}

/* Mobile Responsiveness */
@media (max-width: 650px) {
    h1 {
        font-size: 6rem;
    }
    
    .welcome-section p {
        font-size: 3.2rem;
    }
    
    .content-card h2 {
        font-size: 4.5rem;
    }
    
    .content-card p, .content-card li {
        font-size: 3rem;
    }
    
    .content-card {
        padding: 20px;
    }
    
    .demo-grid {
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 10px;
    }
    
    .demo-item {
        padding: 15px;
        font-size: 2.5rem;
    }
}
</style>