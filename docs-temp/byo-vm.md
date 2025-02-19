# Bring-your-own-VM

Bringing your own Ubuntu Virtual Machine has not been tested, but should be possible:

1. Check prereqs:
    - An Ubuntu 20.04 virtual machine (Ubuntu 20.04 LTS "minimal" tested)
    - A public IP address
    - Port 80 and/or 443 exposed
    - A non-root user to run the script actions needs to be created (e.g. `ace`)
    - Repository cloned to VM
2. Run initialization script:
    ```
    $ cd user-skel
    $ ./init.sh
    ```
  This will install all necessary dependencies including the ace-cli.

3. Prepare ACE-Box by running the ace-cli and providing required values when prompted:
      ```
      $ ace prepare
      ```

4. Enable ACE-Box use case (see [Available use cases](#available-use-cases) for a list):
      ```
      $ ace enable demo_default
      ```
5. Grab a coffee, this process will take some time...