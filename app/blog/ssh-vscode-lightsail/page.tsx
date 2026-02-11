import Link from 'next/link'
import './page.css'

export const metadata = {
  title: 'Setting up SSH with VS Code for Amazon Lightsail | Nice Right',
  description: 'Connect to your Lightsail instance using Remote SSH in VS Code.',
}

export default function SshVsCodeLightsailPage() {
  return (
    <>
      <nav className="nav">
        <div className="container nav-content">
          <Link href="/" className="logo">Nice Right</Link>
          <div className="nav-links">
            <a href="/#services">Services</a>
            <a href="/#work">Work</a>
            <a href="/blog">Insights</a>
            <a href="/#contact" className="btn btn-sm">Start Project</a>
          </div>
        </div>
      </nav>

      <article className="blog-post">
        <div className="container">
          <header className="post-header">
            <div className="post-meta">
              <span className="post-category">Coding & Config</span>
              <span className="post-dot">•</span>
              <span className="post-date">May 5, 2020</span>
              <span className="post-dot">•</span>
              <span className="post-read-time">3 min read</span>
            </div>
            <h1 className="post-title">Setting up SSH with VS Code for Amazon Lightsail</h1>
            <p className="post-subtitle">Connect to your Lightsail instance using Remote SSH in VS Code.</p>
          </header>

          <div className="post-content">
            <h2>Install the Remote - SSH Plugin in VS Code</h2>

            <ol>
              <li>Open <strong>Extensions</strong> in VS Code.</li>
              <li>Search for <strong>Remote - SSH</strong> and install it. This plugin will include a configuration tool that you will use to connect via SSH.</li>
            </ol>

            <p>To log in, you will need:</p>

            <ul>
              <li><strong>Username</strong></li>
              <li><strong>PEM File</strong></li>
            </ul>

            <p>This guide will also cover:</p>

            <ul>
              <li>How to find your Bitnami app password.</li>
              <li>The location of public files if you are using WordPress.</li>
            </ul>

            <h2>Finding Your Credentials</h2>

            <h3>Username</h3>

            <p>Lightsail uses Bitnami containers. Make sure you have the correct username for your container.</p>

            <p>For WordPress containers (at the time of writing), the default username is:</p>

            <p><code>bitnami</code></p>

            <p>The full SSH login will look like this:</p>

            <p><code>ssh bitnami@&lt;your-instance-IP&gt;</code></p>

            <h3>PEM File (Key Pair)</h3>

            <ol>
              <li>Log in to the <strong>Amazon Lightsail</strong> dashboard and go to your instance&apos;s SSH settings.</li>
              <li>Scroll down to find the <strong>public key</strong> section and download your PEM file.</li>
              <li>Save the PEM file to your <code>.ssh</code> folder:
                <ul>
                  <li>On macOS: <code>~/.ssh/tot.pem</code></li>
                  <li>On Windows: <code>C:\Users\&lt;YourUsername&gt;\.ssh\tot.pem</code></li>
                </ul>
              </li>
              <li>Update your SSH configuration file (<code>~/.ssh/config</code> on macOS/Linux, or <code>C:\Users\&lt;YourUsername&gt;\.ssh\config</code> on Windows). Format the configuration file as follows:</li>
            </ol>

            <pre><code>Host MyTestSite
    HostName &lt;your-instance-ip&gt;
    User bitnami
    IdentityFile ~/.ssh/tot.pem</code></pre>

            <h4>Example:</h4>

            <pre><code>Host MyTestSite
    HostName 11.234.567.23
    User bitnami
    IdentityFile ~/.ssh/tot.pem</code></pre>

            <h3>Bitnami Application Password</h3>

            <p>You may not need this password for SSH, but it could be required elsewhere.</p>

            <p>To find it:</p>

            <ol>
              <li>Open the virtual terminal in your Lightsail instance.</li>
              <li>Run the following command: <code>cat bitnami_application_password</code></li>
              <li>Copy and save the password temporarily.</li>
            </ol>

            <h2>Setting Up SSH in VS Code</h2>

            <h3>Using the VS Code Interface</h3>

            <ol>
              <li>Click on the <strong>Remote - SSH</strong> icon in the left toolbar.</li>
              <li>Under <strong>SSH Targets</strong>, click the <strong>+</strong> icon.</li>
              <li>Enter the SSH command in the following format: <code>ssh {'{username}'}@{'{ip-address}'}</code></li>
            </ol>

            <p>Example: <code>ssh bitnami@11.234.567.23</code></p>

            <ol start={4}>
              <li>Select the configuration file location (e.g., <code>~/.ssh/config</code>).</li>
              <li>The new Lightsail host will appear under <strong>SSH Targets</strong>. Click the <strong>Open in New Window</strong> icon to connect.</li>
            </ol>

            <h3>Fixing PEM File Permission Errors</h3>

            <p>If you encounter a permissions error with your PEM file:</p>

            <ol>
              <li>Open a terminal and navigate to the PEM file&apos;s directory.</li>
              <li>Change its permissions: <code>chmod 400 &lt;your-pemfile.pem&gt;</code></li>
            </ol>

            <p>Use <code>400</code> if you do not plan to change the file often.</p>

            <p>Use <code>600</code> if you will update it more frequently.</p>

            <p>Example:</p>

            <pre><code>chmod 400 tot.pem</code></pre>

            <h2>WordPress File Locations</h2>

            <p>If you are using WordPress and need to modify files, the public files are located at:</p>

            <pre><code>/home/bitnami/apps/wordpress/
/home/bitnami/apps/wordpress/htdocs</code></pre>

            <h2>Reference Video</h2>

            <p>For a visual guide, watch this helpful tutorial starting at the 1-minute mark:</p>

            <div className="video-container">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/7kum46SFIaY"
                title="How to Configure SSH in VS Code"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <p>Now you are all set to connect to your Lightsail instance using Remote SSH in VS Code!</p>
          </div>

          <footer className="post-footer">
            <div className="post-tags">
              <span className="tag">AWS</span>
              <span className="tag">VS Code</span>
              <span className="tag">SSH</span>
              <span className="tag">Lightsail</span>
              <span className="tag">Tutorial</span>
            </div>
            
            <nav className="post-nav">
              <Link href="/blog" className="back-link">← All Insights</Link>
            </nav>
          </footer>
        </div>
      </article>

      <footer className="site-footer">
        <div className="container">
          <p>© 2026 Nice Right. Digital growth for small businesses.</p>
        </div>
      </footer>
    </>
  )
}
