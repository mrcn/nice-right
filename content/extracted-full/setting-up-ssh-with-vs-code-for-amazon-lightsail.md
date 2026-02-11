## Install the Remote – SSH Plugin in VS Code

1. Open **Extensions** in VS Code.
2. Search for **Remote – SSH** and install it.This plugin will include a configuration tool that you’ll use to connect via SSH.
To log in, you’ll need:

- **Username**
- **PEM File**
This guide will also cover:

- How to find your Bitnami app password.
- The location of public files if you’re using WordPress.
## Finding Your Credentials

### **Username**

Lightsail uses Bitnami containers. Make sure you have the correct username for your container.For WordPress containers (at the time of writing), the default username is:

`bitnami
`The full SSH login will look like this:`ssh bitnami@`

### **PEM File** (Key Pair)

1. Log in to the **Amazon Lightsail** dashboard and go to your instance’s SSH settings.
2. Scroll down to find the **public key** section and download your PEM file.
3. Save the PEM file to your `.ssh` folder:- On macOS: `~/.ssh/tot.pem`
- On Windows: `C:\Users\\.ssh\tot.pem`
4. Update your SSH configuration file (`~/.ssh/config` on macOS/Linux, or `C:\Users\\.ssh\config` on Windows).Format the configuration file as follows:
`Host MyTestSite
    HostName 
    User bitnami
    IdentityFile ~/.ssh/tot.pem
`#### Example:

```
Host MyTestSite
    HostName 11.234.567.23
    User bitnami
    IdentityFile ~/.ssh/tot.pem

```
### **Bitnami Application Password**

You may not need this password for SSH, but it could be required elsewhere.To find it:

1. Open the virtual terminal in your Lightsail instance.
2. Run the following command: `cat bitnami_application_password`
3. Copy and save the password temporarily.
## Setting Up SSH in VS Code

### Using the VS Code Interface

1. Click on the **Remote – SSH** icon in the left toolbar.
2. Under **SSH Targets**, click the **+** icon.
3. Enter the SSH command in the following format:`ssh {username}@{ip-address}`Example: `ssh bitnami@11.234.567.23`
4. Select the configuration file location (e.g., `~/.ssh/config`).
5. The new Lightsail host will appear under **SSH Targets**.Click the **Open in New Window** icon to connect.
### Fixing PEM File Permission Errors

If you encounter a permissions error with your PEM file:

1. Open a terminal and navigate to the PEM file’s directory.
2. Change its permissions: `chmod 400 `- Use `400` if you don’t plan to change the file often.
- Use `600` if you’ll update it more frequently.
Example:

`chmod 400 tot.pem
`## WordPress File Locations

If you’re using WordPress and need to modify files, the public files are located at:

- `/home/bitnami/apps/wordpress/`
- `/home/bitnami/apps/wordpress/htdocs`
## Reference Video

For a visual guide, watch this helpful tutorial starting at the 1-minute mark:[How to Configure SSH in VS Code](https://www.youtube.com/embed/7kum46SFIaY?feature=oembed)

 Now you’re all set to connect to your Lightsail instance using Remote SSH in VS Code!

## Videos

- **YouTube:** https://www.youtube.com/embed/7kum46SFIaY?feature=oembed