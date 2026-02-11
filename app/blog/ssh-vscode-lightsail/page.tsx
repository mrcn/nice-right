export default function SshVsCodeLightsailPage() {
  return (
    <main className="blog-post">
      <div className="container">
        <header className="post-header">
          <div className="section-label">Coding & Config</div>
          <h1 className="post-title">Setting up SSH with VS Code for Amazon Lightsail</h1>
          <p className="post-subtitle">Connect to your Lightsail instance using Remote SSH in VS Code.</p>
        </header>

        <article className="post-content">
          <h2>Install the Remote - SSH Plugin in VS Code</h2>

          <p>Open Extensions in VS Code.</p>

          <p>Search for Remote - SSH and install it.</p>

          <p>This plugin will include a configuration tool that you&apos;ll use to connect via SSH.</p>

          <p>To log in, you&apos;ll need:</p>

          <ul>
            <li>Username</li>
            <li>PEM File</li>
          </ul>

          <p>This guide will also cover:</p>

          <ul>
            <li>How to find your Bitnami app password.</li>
            <li>The location of public files if you&apos;re using WordPress.</li>
          </ul>

          <h2>Finding Your Credentials</h2>

          <h3>Username</h3>

          <p>Lightsail uses Bitnami containers. Make sure you have the correct username for your container.</p>

          <p>For WordPress containers (at the time of writing), the default username is: <code>bitnami</code></p>

          <p>The full SSH login will look like this:</p>

          <pre><code>ssh bitnami@&lt;your-instance-IP&gt;</code></pre>

          <h3>PEM File (Key Pair)</h3>

          <p>Log in to the Amazon Lightsail dashboard and go to your instance&apos;s SSH settings.</p>

          <p>Scroll down to find the public key section and download your PEM file.</p>

          <p>Save the PEM file to your .ssh folder:</p>

          <ul>
            <li>On macOS: <code>~/.ssh/tot.pem</code></li>
            <li>On Windows: <code>C:\Users\&lt;YourUsername&gt;\.ssh\tot.pem</code></li>
          </ul>

          <p>Update your SSH configuration file (<code>~/.ssh/config</code> on macOS/Linux, or <code>C:\Users\&lt;YourUsername&gt;\.ssh\config</code> on Windows).</p>

          <p>Format the configuration file as follows:</p>

          <pre><code>Host MyTestSite
    HostName &lt;your-instance-ip&gt;
    User bitnami
    IdentityFile ~/.ssh/tot.pem</code></pre>

          <p>Example:</p>

          <pre><code>Host MyTestSite
    HostName 11.234.567.23
    User bitnami
    IdentityFile ~/.ssh/tot.pem</code></pre>

          <h3>Bitnami Application Password</h3>

          <p>You may not need this password for SSH, but it could be required elsewhere.</p>

          <p>To find it:</p>

          <ul>
            <li>Open the virtual terminal in your Lightsail instance.</li>
            <li>Run the following command: <code>cat bitnami_application_password</code></li>
            <li>Copy and save the password temporarily.</li>
          </ul>

          <h2>Setting Up SSH in VS Code</h2>

          <h3>Using the VS Code Interface</h3>

          <ul>
            <li>Click on the Remote - SSH icon in the left toolbar.</li>
            <li>Under SSH Targets, click the + icon.</li>
            <li>Enter the SSH command in the following format: <code>ssh {'{username}'}@{'{ip-address}'}</code></li>
          </ul>

          <p>Example: <code>ssh bitnami@11.234.567.23</code></p>

          <ul>
            <li>Select the configuration file location (e.g., <code>~/.ssh/config</code>).</li>
            <li>The new Lightsail host will appear under SSH Targets.</li>
            <li>Click the Open in New Window icon to connect.</li>
          </ul>

          <h3>Fixing PEM File Permission Errors</h3>

          <p>If you encounter a permissions error with your PEM file:</p>

          <ul>
            <li>Open a terminal and navigate to the PEM file&apos;s directory.</li>
            <li>Change its permissions: <code>chmod 400 &lt;your-pemfile.pem&gt;</code></li>
          </ul>

          <p>Use 400 if you don&apos;t plan to change the file often.</p>

          <p>Use 600 if you&apos;ll update it more frequently.</p>

          <p>Example:</p>

          <pre><code>chmod 400 tot.pem</code></pre>

          <h2>WordPress File Locations</h2>

          <p>If you&apos;re using WordPress and need to modify files, the public files are located at:</p>

          <pre><code>/home/bitnami/apps/wordpress/
/home/bitnami/apps/wordpress/htdocs</code></pre>

          <h2>Reference Video</h2>

          <p>For a visual guide, watch this helpful tutorial starting at the 1-minute mark: How to Configure SSH in VS Code</p>

          <p>Now you&apos;re all set to connect to your Lightsail instance using Remote SSH in VS Code!</p>
        </article>

        <footer className="post-footer">
          <div className="post-tags">
            <span className="tag">AWS</span>
            <span className="tag">VS Code</span>
            <span className="tag">SSH</span>
          </div>
          <nav className="post-nav">
            <a href="/blog" className="back-link">← Back to all posts</a>
          </nav>
        </footer>
      </div>
    </main>
  );
}
