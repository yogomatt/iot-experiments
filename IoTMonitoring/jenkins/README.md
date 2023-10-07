# How to setup jenkins for the IoT monitoring backend

## Install jenkins

Download the Generic Java package (.war) from https://www.jenkins.io/download/

Follow the guide from https://www.jenkins.io/doc/book/installing/war-file/

## Configure the master and slave node for SSH

### Create a SSH key in the jenkins master node

Run the following command in the linux terminal

```
  $ ssh-keygen -t ed25519 -C "your_email@example.com"
```

A file name is requests, just press enter to use the default one.
Also a passphrase and confirmation is needed.

To facilitate the authentication via SSH, the private key could be added to the ssh-agent.

Start the ssh-agent in background
```
  $ eval "$(ssh-agent -s)"
  > Agent pid 59566
```

Add the private key to the ssh-agent

```
  $ ssh-add ~/.ssh/id_ed25519
```
At the end of this process, a couple of files were added to the directory /home/<user>/.SSH
- id_ed25519 (private key)
- id_ed25519.pub (public key)

### Create a user in the raspberry PI OS

It is recommended to have a dedicated user for the jenkins executions in each slave node.

Run the following command:

```
  sudo adduser jenkins
```
Enter a password and full name for the new user.
In addition, a new group 'jenkins' and home directory '/home/jenkins' will be created.

To be able to access the devices GPIO pins, the user must belong to the group gpio:

```
  sudo usermod -a -G gpio jenkins
```


Add the new user to the sudo group (Note: not necessary)
```
  sudo adduser jenkins sudo
```

### Add the master's public key to the slave node

Login as jenkins user in the slave node.

Go to the directory /home/jenkins/.ssh

> If the directory .ssh does not exist then create it manually using ``` mkdir .ssh```


Create a new file with name 'authorized_keys' and paste the public key content.

```
  vi authorized_keys (paste in the content of the master's public key)
```

### Add the slave node fingerprint to the master's know hosts

SSH requires to acknowledge the slave node as known host.

Run the following command in the master node to retrieve the slave node fingerprint using the slave node's IP address.

```
  ssh-keyscan -H 192.168.1.162 >> ~/.ssh/known_hosts
```

## Install Java in the slave node

Java is required to run the jenkins agent in the slave.

Run the following command to install java using a user from the sudo group.

```
sudo apt install openjdk-11-jre
```
> It is recommended to execute ```sudo apt update``` in order to update the repository and avoid any error during installation

## Install Git in the slave node

The Git client is required for project checkout in the slave node through a command originated in the master and passed to the slave node's agent.

To install git execute:

```
sudo apt-get install git
```

## Configure the jenkins credentials for SSH

Go to Manage jenkins > Manage credentials

Create a new credential with the following data:
- Scope: Global
- ID: a unique ID
- Username: jenkins
- Private Key: Copy the private key content from the master's file located in /home/<user>/.ssh/id_ed25519
- Passphrase: Enter the passphrase configured during the SSH key pair generation.
- Save

## Configure the slave node in jenkins

With all prerequisites ready, go to Manage jenkins > Manage Nodes and Clouds > New Node.
Use the following setup:
- Name: raspberry
- Number of executors: 1
- Remote directory: /home/jenkins
- Launch method: Launch agents via SSH
  - Host: Slave IP address
  - Credentials: Select the pre-configured credentials for ssh
  - Host key verification strategy: Known hosts file verification strategy
