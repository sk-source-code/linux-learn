const coreCommands = [
    {
        name: "ls",
        category: "files",
        description: "List directory contents. Show permissions, ownership, sizes, timestamps in long format. Supports sorting, recursive listing, and hidden file display.",
        syntax: "ls [OPTION]... [FILE]...",
        flags: [
            { flag: "-l", desc: "Use a long listing format showing permissions, owner, size, and date." },
            { flag: "-a", desc: "Do not ignore entries starting with . (hidden files)." },
            { flag: "-h", desc: "Print sizes in human readable format (e.g., 1K 234M 2G)." },
            { flag: "-R", desc: "List subdirectories recursively." }
        ],
        examples: [
            { desc: "List all files with human-readable sizes:", code: "ls -lah" },
            { desc: "List files sorted by modification time:", code: "ls -lt" }
        ]
    },
    {
        name: "cd",
        category: "files",
        description: "Change the current working directory. Navigate to home, parent, previous, or absolute/relative paths.",
        syntax: "cd [DIR]",
        flags: [
            { flag: "-", desc: "Go to the previous directory." },
            { flag: "~", desc: "Go to the home directory." },
            { flag: "..", desc: "Go up one directory level to the parent directory." }
        ],
        examples: [
            { desc: "Navigate to the parent directory:", code: "cd .." },
            { desc: "Navigate back to the previous working directory:", code: "cd -" }
        ]
    },
    {
        name: "pwd",
        category: "files",
        description: "Print the full pathname of the current working directory. Resolves any symbolic links if specified.",
        syntax: "pwd [OPTION]...",
        flags: [
            { flag: "-L", desc: "Use PWD from environment, even if it contains symlinks." },
            { flag: "-P", desc: "Avoid all symlinks, print actual physical path." }
        ],
        examples: [
            { desc: "Print current directory path:", code: "pwd" },
            { desc: "Print actual physical path, resolving symlinks:", code: "pwd -P" }
        ]
    },
    {
        name: "mkdir",
        category: "files",
        description: "Create directories. Can create parent directories recursively with the -p flag.",
        syntax: "mkdir [OPTION]... DIRECTORY...",
        flags: [
            { flag: "-p", desc: "No error if existing, make parent directories as needed." },
            { flag: "-m", desc: "Set file mode (permissions), similar to chmod." },
            { flag: "-v", desc: "Print a message for each created directory." }
        ],
        examples: [
            { desc: "Create a nested directory structure:", code: "mkdir -p project/src/components" },
            { desc: "Create a directory with specific permissions:", code: "mkdir -m 700 private_folder" }
        ]
    },
    {
        name: "rmdir",
        category: "files",
        description: "Remove empty directories. Fails if the directory contains any files or subdirectories.",
        syntax: "rmdir [OPTION]... DIRECTORY...",
        flags: [
            { flag: "-p", desc: "Remove DIRECTORY and its ancestors." },
            { flag: "-v", desc: "Output a diagnostic for every directory processed." }
        ],
        examples: [
            { desc: "Remove a single empty directory:", code: "rmdir old_folder" },
            { desc: "Remove a nested empty directory path:", code: "rmdir -p a/b/c" }
        ]
    },
    {
        name: "cp",
        category: "files",
        description: "Copy files and directories. Supports recursive copy, preserving attributes, and interactive mode.",
        syntax: "cp [OPTION]... SOURCE DEST",
        flags: [
            { flag: "-r", desc: "Copy directories recursively." },
            { flag: "-i", desc: "Prompt before overwrite." },
            { flag: "-p", desc: "Preserve specified attributes (mode, ownership, timestamps)." },
            { flag: "-u", desc: "Copy only when the SOURCE file is newer than the destination file or when the destination file is missing." }
        ],
        examples: [
            { desc: "Copy a file to another location:", code: "cp file.txt /backup/file.txt" },
            { desc: "Recursively copy a directory and preserve attributes:", code: "cp -rp /src /dest" }
        ]
    },
    {
        name: "mv",
        category: "files",
        description: "Move or rename files and directories. Can move across filesystems.",
        syntax: "mv [OPTION]... SOURCE DEST",
        flags: [
            { flag: "-i", desc: "Prompt before overwrite." },
            { flag: "-f", desc: "Do not prompt before overwriting." },
            { flag: "-u", desc: "Move only when the SOURCE file is newer than the destination file." },
            { flag: "-v", desc: "Explain what is being done." }
        ],
        examples: [
            { desc: "Rename a file:", code: "mv old_name.txt new_name.txt" },
            { desc: "Move a file to a directory, prompting if it exists:", code: "mv -i config.json /etc/" }
        ]
    },
    {
        name: "rm",
        category: "files",
        description: "Remove files or directories. Supports recursive deletion, force mode, and interactive confirmation.",
        syntax: "rm [OPTION]... FILE...",
        flags: [
            { flag: "-r", desc: "Remove directories and their contents recursively." },
            { flag: "-f", desc: "Ignore nonexistent files and arguments, never prompt." },
            { flag: "-i", desc: "Prompt before every removal." },
            { flag: "-v", desc: "Explain what is being done." }
        ],
        examples: [
            { desc: "Forcefully remove a directory and its contents:", code: "rm -rf old_project" },
            { desc: "Interactively remove multiple files:", code: "rm -i *.tmp" }
        ]
    },
    {
        name: "touch",
        category: "files",
        description: "Create empty files or update file timestamps. Useful for scripting and resetting file times.",
        syntax: "touch [OPTION]... FILE...",
        flags: [
            { flag: "-a", desc: "Change only the access time." },
            { flag: "-m", desc: "Change only the modification time." },
            { flag: "-c", desc: "Do not create any files." },
            { flag: "-t", desc: "Use specified time instead of current time." }
        ],
        examples: [
            { desc: "Create an empty file:", code: "touch newfile.txt" },
            { desc: "Update access and modification times to current time:", code: "touch existingfile.txt" }
        ]
    },
    {
        name: "find",
        category: "files",
        description: "Search for files in a directory hierarchy by name, type, size, time, permissions, and more.",
        syntax: "find [-H] [-L] [-P] [-Olevel] [-D debugopts] [path...] [expression]",
        flags: [
            { flag: "-name", desc: "Base of file name (the path with the leading directories removed) matches shell pattern." },
            { flag: "-type", desc: "File is of type c (f=file, d=directory, l=symlink)." },
            { flag: "-size", desc: "File uses n units of space (e.g., +50M for larger than 50MB)." },
            { flag: "-mtime", desc: "Data was last modified n*24 hours ago." }
        ],
        examples: [
            { desc: "Find all text files larger than 10MB:", code: "find . -type f -name \"*.txt\" -size +10M" },
            { desc: "Find and delete log files older than 30 days:", code: "find /var/log -name \"*.log\" -mtime +30 -exec rm {} \\;" }
        ]
    },
    {
        name: "locate",
        category: "files",
        description: "Find files by name using a pre-built database. Much faster than find for simple name searches.",
        syntax: "locate [OPTION]... PATTERN...",
        flags: [
            { flag: "-i", desc: "Ignore case distinctions in both the pattern and the file names." },
            { flag: "-c", desc: "Instead of writing file names on standard output, write the number of matching entries only." },
            { flag: "-l", desc: "Exit successfully after finding specified number of entries." }
        ],
        examples: [
            { desc: "Find all files containing 'config' case-insensitively:", code: "locate -i config" },
            { desc: "Count the number of files named 'nginx.conf':", code: "locate -c nginx.conf" }
        ]
    },
    {
        name: "ln",
        category: "files",
        description: "Create hard and symbolic (soft) links between files.",
        syntax: "ln [OPTION]... TARGET [LINK_NAME]",
        flags: [
            { flag: "-s", desc: "Make symbolic links instead of hard links." },
            { flag: "-f", desc: "Remove existing destination files." },
            { flag: "-v", desc: "Print name of each linked file." }
        ],
        examples: [
            { desc: "Create a symbolic link to a file:", code: "ln -s /path/to/original.txt link_name.txt" },
            { desc: "Create a hard link:", code: "ln file1.txt file2.txt" }
        ]
    },
    {
        name: "tree",
        category: "files",
        description: "List contents of directories in a tree-like format.",
        syntax: "tree [OPTION]... [DIRECTORY]",
        flags: [
            { flag: "-d", desc: "List directories only." },
            { flag: "-a", desc: "All files are listed (including hidden)." },
            { flag: "-L", desc: "Max display depth of the directory tree." }
        ],
        examples: [
            { desc: "Show directory tree up to 2 levels deep:", code: "tree -L 2" },
            { desc: "Show only directories in tree format:", code: "tree -d" }
        ]
    },
    {
        name: "stat",
        category: "files",
        description: "Display detailed file or filesystem status including inode, permissions, timestamps.",
        syntax: "stat [OPTION]... FILE...",
        flags: [
            { flag: "-c", desc: "Use the specified FORMAT instead of the default." },
            { flag: "-f", desc: "Display file system status instead of file status." },
            { flag: "-t", desc: "Print the information in terse form." }
        ],
        examples: [
            { desc: "Display standard file information:", code: "stat file.txt" },
            { desc: "Print only the file permissions in octal:", code: "stat -c '%a' file.txt" }
        ]
    },
    {
        name: "file",
        category: "files",
        description: "Determine file type by examining content rather than extension.",
        syntax: "file [OPTION]... FILE...",
        flags: [
            { flag: "-i", desc: "Output mime type strings instead of human readable ones." },
            { flag: "-b", desc: "Do not prepend filenames to output lines (brief mode)." },
            { flag: "-z", desc: "Try to look inside compressed files." }
        ],
        examples: [
            { desc: "Determine the file type:", code: "file unknown_file" },
            { desc: "Get the MIME type of a file:", code: "file -i image.jpg" }
        ]
    },
    {
        name: "cat",
        category: "text",
        description: "Concatenate and display file contents. Can combine multiple files, number lines, and show non-printing characters.",
        syntax: "cat [OPTION]... [FILE]...",
        flags: [
            { flag: "-n", desc: "Number all output lines." },
            { flag: "-E", desc: "Display $ at end of each line." },
            { flag: "-T", desc: "Display TAB characters as ^I." }
        ],
        examples: [
            { desc: "View file contents with line numbers:", code: "cat -n file.txt" },
            { desc: "Combine two files into one:", code: "cat file1.txt file2.txt > combined.txt" }
        ]
    },
    {
        name: "less",
        category: "text",
        description: "View file contents page by page with forward and backward navigation, searching.",
        syntax: "less [OPTION]... FILE...",
        flags: [
            { flag: "-N", desc: "Causes a line number to be displayed at the beginning of each line." },
            { flag: "-S", desc: "Causes lines longer than the screen width to be chopped rather than folded." },
            { flag: "-F", desc: "Causes less to automatically exit if the entire file can be displayed on the first screen." }
        ],
        examples: [
            { desc: "Read a large file with line numbers:", code: "less -N large_log.txt" },
            { desc: "Search within a file (type /pattern inside less):", code: "less system.log" }
        ]
    },
    {
        name: "head",
        category: "text",
        description: "Output the first part of files. Default is 10 lines.",
        syntax: "head [OPTION]... [FILE]...",
        flags: [
            { flag: "-n", desc: "Print the first NUM lines instead of the first 10." },
            { flag: "-c", desc: "Print the first NUM bytes." },
            { flag: "-q", desc: "Never print headers giving file names." }
        ],
        examples: [
            { desc: "Print the first 20 lines of a file:", code: "head -n 20 file.txt" },
            { desc: "Print the first 50 bytes of a file:", code: "head -c 50 file.txt" }
        ]
    },
    {
        name: "tail",
        category: "text",
        description: "Output the last part of files. Can follow file growth in real-time with -f.",
        syntax: "tail [OPTION]... [FILE]...",
        flags: [
            { flag: "-n", desc: "Output the last NUM lines, instead of the last 10." },
            { flag: "-f", desc: "Output appended data as the file grows." },
            { flag: "-c", desc: "Output the last NUM bytes." }
        ],
        examples: [
            { desc: "Follow a log file in real-time:", code: "tail -f /var/log/syslog" },
            { desc: "Print the last 50 lines of a file:", code: "tail -n 50 log.txt" }
        ]
    },
    {
        name: "grep",
        category: "text",
        description: "Search for text patterns in files using regular expressions. Supports recursive search, case-insensitive matching, inversion.",
        syntax: "grep [OPTION]... PATTERNS [FILE]...",
        flags: [
            { flag: "-i", desc: "Ignore case distinctions." },
            { flag: "-r", desc: "Read all files under each directory, recursively." },
            { flag: "-v", desc: "Invert the sense of matching, to select non-matching lines." },
            { flag: "-E", desc: "Interpret PATTERNS as extended regular expressions (ERE)." }
        ],
        examples: [
            { desc: "Search recursively for a string case-insensitively:", code: "grep -ir \"error\" /var/log/" },
            { desc: "Find lines NOT containing a word:", code: "grep -v \"debug\" app.log" }
        ]
    },
    {
        name: "sed",
        category: "text",
        description: "Stream editor for filtering and transforming text. Perform substitutions, deletions, and insertions.",
        syntax: "sed [OPTION]... {script-only-if-no-other-script} [input-file]...",
        flags: [
            { flag: "-i", desc: "Edit files in place (makes backup if SUFFIX supplied)." },
            { flag: "-n", desc: "Suppress automatic printing of pattern space." },
            { flag: "-e", desc: "Add the script to the commands to be executed." }
        ],
        examples: [
            { desc: "Replace first occurrence of 'foo' with 'bar' on each line:", code: "sed 's/foo/bar/' file.txt" },
            { desc: "In-place replace all occurrences of 'foo' with 'bar':", code: "sed -i 's/foo/bar/g' file.txt" }
        ]
    },
    {
        name: "awk",
        category: "text",
        description: "Pattern scanning and text processing language. Extract fields, perform calculations, format output.",
        syntax: "awk [POSIX or GNU style options] -f progfile [--] file ...",
        flags: [
            { flag: "-F", desc: "Define the input field separator (default is space)." },
            { flag: "-v", desc: "Assign a value to a variable before execution." },
            { flag: "-f", desc: "Read the awk program from the file progfile." }
        ],
        examples: [
            { desc: "Print the first and third columns of a file:", code: "awk '{print $1, $3}' file.txt" },
            { desc: "Print lines where the second column is greater than 50:", code: "awk '$2 > 50' data.csv" }
        ]
    },
    {
        name: "sort",
        category: "text",
        description: "Sort lines of text files alphabetically, numerically, or by specific fields.",
        syntax: "sort [OPTION]... [FILE]...",
        flags: [
            { flag: "-n", desc: "Compare according to string numerical value." },
            { flag: "-r", desc: "Reverse the result of comparisons." },
            { flag: "-k", desc: "Sort via a key; KEYDEF gives location and type." }
        ],
        examples: [
            { desc: "Sort a file numerically in reverse order:", code: "sort -nr numbers.txt" },
            { desc: "Sort by the second column:", code: "sort -k 2 file.txt" }
        ]
    },
    {
        name: "uniq",
        category: "text",
        description: "Report or omit repeated lines. Often used with sort.",
        syntax: "uniq [OPTION]... [INPUT [OUTPUT]]",
        flags: [
            { flag: "-c", desc: "Prefix lines by the number of occurrences." },
            { flag: "-d", desc: "Only print duplicate lines, one for each group." },
            { flag: "-i", desc: "Ignore differences in case when comparing." }
        ],
        examples: [
            { desc: "Count occurrences of each unique line (requires sorted input):", code: "sort file.txt | uniq -c" },
            { desc: "Show only duplicate lines:", code: "sort file.txt | uniq -d" }
        ]
    },
    {
        name: "wc",
        category: "text",
        description: "Print line, word, and byte counts for files.",
        syntax: "wc [OPTION]... [FILE]...",
        flags: [
            { flag: "-l", desc: "Print the newline counts." },
            { flag: "-w", desc: "Print the word counts." },
            { flag: "-c", desc: "Print the byte counts." }
        ],
        examples: [
            { desc: "Count lines in a file:", code: "wc -l file.txt" },
            { desc: "Count words and lines:", code: "wc -lw document.txt" }
        ]
    },
    {
        name: "diff",
        category: "text",
        description: "Compare files line by line and show differences.",
        syntax: "diff [OPTION]... FILES",
        flags: [
            { flag: "-u", desc: "Output NUM (default 3) lines of unified context." },
            { flag: "-q", desc: "Report only when files differ." },
            { flag: "-r", desc: "Recursively compare any subdirectories found." }
        ],
        examples: [
            { desc: "Show unified differences between two files:", code: "diff -u file1.txt file2.txt" },
            { desc: "Recursively compare two directories:", code: "diff -ru dir1 dir2" }
        ]
    },
    {
        name: "cut",
        category: "text",
        description: "Remove sections from each line of files. Extract columns by delimiter or character position.",
        syntax: "cut OPTION... [FILE]...",
        flags: [
            { flag: "-d", desc: "Use DELIM instead of TAB for field delimiter." },
            { flag: "-f", desc: "Select only these fields; also print any line that contains no delimiter character." },
            { flag: "-c", desc: "Select only these characters." }
        ],
        examples: [
            { desc: "Extract the first column using colon as delimiter (e.g., from /etc/passwd):", code: "cut -d: -f1 /etc/passwd" },
            { desc: "Extract characters 1 through 5 from each line:", code: "cut -c 1-5 file.txt" }
        ]
    },
    {
        name: "tr",
        category: "text",
        description: "Translate or delete characters. Useful for case conversion and removing specific characters.",
        syntax: "tr [OPTION]... SET1 [SET2]",
        flags: [
            { flag: "-d", desc: "Delete characters in SET1, do not translate." },
            { flag: "-s", desc: "Squeeze multiple occurrences of the characters listed in the last operand into a single instance." },
            { flag: "-c", desc: "Use the complement of SET1." }
        ],
        examples: [
            { desc: "Convert lowercase to uppercase:", code: "cat file.txt | tr 'a-z' 'A-Z'" },
            { desc: "Delete all digits from a file:", code: "cat file.txt | tr -d '0-9'" }
        ]
    },
    {
        name: "chmod",
        category: "permissions",
        description: "Change file access permissions using symbolic or octal notation. Controls read, write, execute for owner, group, others.",
        syntax: "chmod [OPTION]... MODE[,MODE]... FILE...",
        flags: [
            { flag: "-R", desc: "Change files and directories recursively." },
            { flag: "-v", desc: "Output a diagnostic for every file processed." },
            { flag: "-f", desc: "Suppress most error messages." }
        ],
        examples: [
            { desc: "Give owner read/write/execute, and others read/execute (octal):", code: "chmod 755 script.sh" },
            { desc: "Add execute permission for all users (symbolic):", code: "chmod a+x script.sh" }
        ]
    },
    {
        name: "chown",
        category: "permissions",
        description: "Change file owner and group. Supports recursive ownership changes.",
        syntax: "chown [OPTION]... [OWNER][:[GROUP]] FILE...",
        flags: [
            { flag: "-R", desc: "Operate on files and directories recursively." },
            { flag: "-v", desc: "Output a diagnostic for every file processed." },
            { flag: "-h", desc: "Affect symbolic links instead of any referenced file." }
        ],
        examples: [
            { desc: "Change owner and group of a file:", code: "chown user:group file.txt" },
            { desc: "Recursively change owner of a directory:", code: "chown -R www-data:www-data /var/www/html" }
        ]
    },
    {
        name: "chgrp",
        category: "permissions",
        description: "Change group ownership of files.",
        syntax: "chgrp [OPTION]... GROUP FILE...",
        flags: [
            { flag: "-R", desc: "Operate on files and directories recursively." },
            { flag: "-v", desc: "Output a diagnostic for every file processed." },
            { flag: "-h", desc: "Affect symbolic links instead of any referenced file." }
        ],
        examples: [
            { desc: "Change the group ownership of a file:", code: "chgrp developers file.txt" },
            { desc: "Recursively change group ownership:", code: "chgrp -R staff /project" }
        ]
    },
    {
        name: "umask",
        category: "permissions",
        description: "Set default file creation permissions mask.",
        syntax: "umask [-p] [-S] [mode]",
        flags: [
            { flag: "-S", desc: "Print the mask in symbolic format." },
            { flag: "-p", desc: "Output in a form that may be reused as input." }
        ],
        examples: [
            { desc: "View current umask:", code: "umask" },
            { desc: "Set umask to deny write permission to group and others:", code: "umask 022" }
        ]
    },
    {
        name: "ps",
        category: "process",
        description: "Report a snapshot of current processes with details like PID, CPU, memory usage.",
        syntax: "ps [options]",
        flags: [
            { flag: "-e", desc: "Select all processes." },
            { flag: "-f", desc: "Do full-format listing." },
            { flag: "aux", desc: "BSD style: all users, with process status, without controlling tty." }
        ],
        examples: [
            { desc: "List all running processes with full details:", code: "ps aux" },
            { desc: "Find a specific process by name:", code: "ps aux | grep nginx" }
        ]
    },
    {
        name: "top",
        category: "process",
        description: "Display real-time dynamic view of running processes with CPU and memory statistics.",
        syntax: "top -hv | -bcHiOSs -d secs -n max -u|U user -p pid(s) -o field -w [cols]",
        flags: [
            { flag: "-u", desc: "Monitor only processes for a specific user." },
            { flag: "-p", desc: "Monitor only processes with specified process IDs." },
            { flag: "-d", desc: "Specifies the delay between screen updates." }
        ],
        examples: [
            { desc: "Run top monitoring a specific user:", code: "top -u postgres" },
            { desc: "Run top with a 5-second refresh interval:", code: "top -d 5" }
        ]
    },
    {
        name: "kill",
        category: "process",
        description: "Send signals to processes by PID. Used to terminate, stop, or continue processes.",
        syntax: "kill [options] <pid> [...]",
        flags: [
            { flag: "-9", desc: "Send SIGKILL signal (force kill, cannot be caught or ignored)." },
            { flag: "-15", desc: "Send SIGTERM signal (polite request to terminate, default)." },
            { flag: "-l", desc: "List all available signals." }
        ],
        examples: [
            { desc: "Gracefully terminate a process:", code: "kill 1234" },
            { desc: "Forcefully kill a stubborn process:", code: "kill -9 1234" }
        ]
    },
    {
        name: "killall",
        category: "process",
        description: "Kill processes by name rather than PID.",
        syntax: "killall [OPTION]... [--] NAME...",
        flags: [
            { flag: "-9", desc: "Send SIGKILL instead of SIGTERM." },
            { flag: "-u", desc: "Kill only processes the specified user owns." },
            { flag: "-I", desc: "Do case insensitive process name match." }
        ],
        examples: [
            { desc: "Kill all processes named 'firefox':", code: "killall firefox" },
            { desc: "Force kill all 'node' processes owned by user 'suhas':", code: "killall -9 -u suhas node" }
        ]
    },
    {
        name: "bg",
        category: "process",
        description: "Resume suspended jobs in the background.",
        syntax: "bg [job_spec ...]",
        flags: [],
        examples: [
            { desc: "Resume the most recently suspended job in the background:", code: "bg" },
            { desc: "Resume job number 2 in the background:", code: "bg %2" }
        ]
    },
    {
        name: "fg",
        category: "process",
        description: "Bring background jobs to the foreground.",
        syntax: "fg [job_spec]",
        flags: [],
        examples: [
            { desc: "Bring the most recent background job to the foreground:", code: "fg" },
            { desc: "Bring job number 1 to the foreground:", code: "fg %1" }
        ]
    },
    {
        name: "jobs",
        category: "process",
        description: "List all active jobs in the current shell session.",
        syntax: "jobs [-lnprs] [jobspec ...]",
        flags: [
            { flag: "-l", desc: "List process IDs in addition to the normal information." },
            { flag: "-p", desc: "List only the process ID of the job's process group leader." },
            { flag: "-r", desc: "Restrict output to running jobs." }
        ],
        examples: [
            { desc: "List all jobs with their PIDs:", code: "jobs -l" },
            { desc: "List only running jobs:", code: "jobs -r" }
        ]
    },
    {
        name: "nohup",
        category: "process",
        description: "Run a command immune to hangups, allowing it to continue after logout.",
        syntax: "nohup COMMAND [ARG]...",
        flags: [],
        examples: [
            { desc: "Run a script in the background that persists after logout:", code: "nohup ./long_script.sh &" },
            { desc: "Run a command and redirect output to a specific file:", code: "nohup command > output.log 2>&1 &" }
        ]
    },
    {
        name: "nice",
        category: "process",
        description: "Run a command with modified scheduling priority. Lower priority values mean higher priority.",
        syntax: "nice [OPTION] [COMMAND [ARG]...]",
        flags: [
            { flag: "-n", desc: "Add integer N to the niceness (default 10)." }
        ],
        examples: [
            { desc: "Run a command with a lower priority (higher niceness):", code: "nice -n 15 tar -czf backup.tar.gz /data" },
            { desc: "Run a command with a higher priority (requires root):", code: "sudo nice -n -5 ./intensive_task" }
        ]
    },
    {
        name: "renice",
        category: "process",
        description: "Alter the scheduling priority of running processes.",
        syntax: "renice [-n] priority [-g|-p|-u] identifier...",
        flags: [
            { flag: "-p", desc: "Interpret arguments as process IDs (default)." },
            { flag: "-u", desc: "Interpret arguments as user names." },
            { flag: "-g", desc: "Interpret arguments as process group IDs." }
        ],
        examples: [
            { desc: "Change the priority of a running process (PID 1234):", code: "renice -n 10 -p 1234" },
            { desc: "Change the priority of all processes owned by user 'suhas':", code: "renice -n 5 -u suhas" }
        ]
    },
    {
        name: "df",
        category: "disk",
        description: "Report filesystem disk space usage. Shows mounted filesystems with used/available space.",
        syntax: "df [OPTION]... [FILE]...",
        flags: [
            { flag: "-h", desc: "Print sizes in powers of 1024 (e.g., 1023M)." },
            { flag: "-T", desc: "Print file system type." },
            { flag: "-i", desc: "List inode information instead of block usage." }
        ],
        examples: [
            { desc: "Show disk space in human-readable format with filesystem types:", code: "df -hT" },
            { desc: "Check inode usage:", code: "df -i" }
        ]
    },
    {
        name: "du",
        category: "disk",
        description: "Estimate file and directory space usage. Summarize disk usage of each file/directory.",
        syntax: "du [OPTION]... [FILE]...",
        flags: [
            { flag: "-h", desc: "Print sizes in human readable format (e.g., 1K 234M 2G)." },
            { flag: "-s", desc: "Display only a total for each argument." },
            { flag: "-c", desc: "Produce a grand total." }
        ],
        examples: [
            { desc: "Show total size of a directory in human-readable format:", code: "du -sh /var/log" },
            { desc: "List sizes of all items in current directory and show grand total:", code: "du -hc *" }
        ]
    },
    {
        name: "mount",
        category: "disk",
        description: "Mount a filesystem. Attach storage devices to the directory tree.",
        syntax: "mount [-t fstype] [-o options] device dir",
        flags: [
            { flag: "-t", desc: "Specify the filesystem type (e.g., ext4, ntfs)." },
            { flag: "-o", desc: "Comma-separated list of mount options." },
            { flag: "-a", desc: "Mount all filesystems mentioned in fstab." }
        ],
        examples: [
            { desc: "Mount a USB drive:", code: "sudo mount /dev/sdb1 /mnt/usb" },
            { desc: "Mount an ISO file as a loop device:", code: "sudo mount -o loop image.iso /mnt/iso" }
        ]
    },
    {
        name: "umount",
        category: "disk",
        description: "Unmount filesystems safely.",
        syntax: "umount [-hV] [-dflnrv] {dir|device}...",
        flags: [
            { flag: "-f", desc: "Force unmount (in case of an unreachable NFS system)." },
            { flag: "-l", desc: "Lazy unmount. Detach the filesystem now, and cleanup all references later." },
            { flag: "-v", desc: "Say what is being done." }
        ],
        examples: [
            { desc: "Unmount a mounted directory:", code: "sudo umount /mnt/usb" },
            { desc: "Lazy unmount a busy directory:", code: "sudo umount -l /mnt/network_share" }
        ]
    },
    {
        name: "lsblk",
        category: "disk",
        description: "List information about all available block devices including disks, partitions, and their mount points.",
        syntax: "lsblk [options] [<device> ...]",
        flags: [
            { flag: "-f", desc: "Output info about filesystems (types, labels, UUIDs)." },
            { flag: "-o", desc: "List specified columns." },
            { flag: "-d", desc: "Don't print slaves or holders (only devices)." }
        ],
        examples: [
            { desc: "List all block devices with filesystem info:", code: "lsblk -f" },
            { desc: "Show specific columns for all devices:", code: "lsblk -o NAME,SIZE,MOUNTPOINT" }
        ]
    },
    {
        name: "fdisk",
        category: "disk",
        description: "Manipulate disk partition tables. Create, delete, resize partitions.",
        syntax: "fdisk [options] <disk>",
        flags: [
            { flag: "-l", desc: "List the partition tables for the specified devices and then exit." },
            { flag: "-s", desc: "Print the size of a specific partition." }
        ],
        examples: [
            { desc: "List all partitions on all disks:", code: "sudo fdisk -l" },
            { desc: "Open the interactive fdisk prompt for a specific disk:", code: "sudo fdisk /dev/sda" }
        ]
    },
    {
        name: "apt",
        category: "package",
        description: "Advanced Package Tool for Debian/Ubuntu. Install, update, remove, and search packages.",
        syntax: "apt [options] command",
        flags: [
            { flag: "-y", desc: "Assume Yes to all queries and do not prompt." },
            { flag: "--purge", desc: "Use with remove to completely remove configuration files." }
        ],
        examples: [
            { desc: "Update package list and upgrade all packages:", code: "sudo apt update && sudo apt upgrade" },
            { desc: "Install a new package without prompting:", code: "sudo apt install -y nginx" }
        ]
    },
    {
        name: "yum",
        category: "package",
        description: "Yellowdog Updater Modified for RHEL/CentOS. Package manager for RPM-based distributions.",
        syntax: "yum [options] [command] [package ...]",
        flags: [
            { flag: "-y", desc: "Assume yes to all questions." },
            { flag: "-q", desc: "Quiet operation." }
        ],
        examples: [
            { desc: "Install a package:", code: "sudo yum install httpd" },
            { desc: "Search for a package by keyword:", code: "yum search php" }
        ]
    },
    {
        name: "dnf",
        category: "package",
        description: "Dandified YUM, the next-generation package manager for Fedora and RHEL 8+.",
        syntax: "dnf [options] COMMAND",
        flags: [
            { flag: "-y", desc: "Automatically answer yes for all questions." },
            { flag: "--enablerepo", desc: "Temporarily enable a repository." }
        ],
        examples: [
            { desc: "Upgrade all installed packages:", code: "sudo dnf upgrade" },
            { desc: "Remove a package and its unused dependencies:", code: "sudo dnf autoremove vim" }
        ]
    },
    {
        name: "pacman",
        category: "package",
        description: "Package manager for Arch Linux. Fast, simple, and powerful.",
        syntax: "pacman <operation> [options] [targets]",
        flags: [
            { flag: "-S", desc: "Sync. Install packages from repositories." },
            { flag: "-Syu", desc: "Synchronize package databases and update system." },
            { flag: "-Rns", desc: "Remove package, its config files, and unneeded dependencies." }
        ],
        examples: [
            { desc: "Update the entire system:", code: "sudo pacman -Syu" },
            { desc: "Search for a package in the repositories:", code: "pacman -Ss nodejs" }
        ]
    },
    {
        name: "uname",
        category: "system",
        description: "Print system information including kernel name, version, architecture.",
        syntax: "uname [OPTION]...",
        flags: [
            { flag: "-a", desc: "Print all information." },
            { flag: "-r", desc: "Print the kernel release." },
            { flag: "-m", desc: "Print the machine hardware name (architecture)." }
        ],
        examples: [
            { desc: "Print all system information:", code: "uname -a" },
            { desc: "Show only the kernel version:", code: "uname -r" }
        ]
    },
    {
        name: "hostname",
        category: "system",
        description: "Show or set the system hostname.",
        syntax: "hostname [-b] [-d] [-f] [-i] [-s] [-y] [name]",
        flags: [
            { flag: "-I", desc: "Display all network addresses of the host." },
            { flag: "-f", desc: "Display the FQDN (Fully Qualified Domain Name)." }
        ],
        examples: [
            { desc: "Show the current hostname:", code: "hostname" },
            { desc: "Show the IP addresses associated with the host:", code: "hostname -I" }
        ]
    },
    {
        name: "uptime",
        category: "system",
        description: "Show how long the system has been running, number of users, and load averages.",
        syntax: "uptime [options]",
        flags: [
            { flag: "-p", desc: "Show uptime in pretty format." },
            { flag: "-s", desc: "System up since (date and time)." }
        ],
        examples: [
            { desc: "Display system uptime and load average:", code: "uptime" },
            { desc: "Display uptime in a readable format:", code: "uptime -p" }
        ]
    },
    {
        name: "whoami",
        category: "system",
        description: "Print the effective username of the current user.",
        syntax: "whoami [OPTION]...",
        flags: [
            { flag: "--help", desc: "Display this help and exit." }
        ],
        examples: [
            { desc: "Print current logged in username:", code: "whoami" }
        ]
    },
    {
        name: "id",
        category: "system",
        description: "Print real and effective user and group IDs.",
        syntax: "id [OPTION]... [USER]",
        flags: [
            { flag: "-u", desc: "Print only the effective user ID." },
            { flag: "-g", desc: "Print only the effective group ID." },
            { flag: "-G", desc: "Print all group IDs." }
        ],
        examples: [
            { desc: "Display user and group IDs for the current user:", code: "id" },
            { desc: "Display user and group IDs for a specific user:", code: "id postgres" }
        ]
    },
    {
        name: "lscpu",
        category: "system",
        description: "Display information about the CPU architecture.",
        syntax: "lscpu [options]",
        flags: [
            { flag: "-e", desc: "Print information in human-readable format." },
            { flag: "-p", desc: "Print information in parsable format." }
        ],
        examples: [
            { desc: "Show CPU details:", code: "lscpu" }
        ]
    },
    {
        name: "free",
        category: "system",
        description: "Display amount of free and used memory (RAM and swap) in the system.",
        syntax: "free [options]",
        flags: [
            { flag: "-h", desc: "Show all output fields automatically scaled to shortest three digit unit." },
            { flag: "-m", desc: "Display the amount of memory in megabytes." },
            { flag: "-s", desc: "Continuously display the result delay seconds apart." }
        ],
        examples: [
            { desc: "Show memory usage in human-readable format:", code: "free -h" },
            { desc: "Watch memory usage refresh every 2 seconds:", code: "free -h -s 2" }
        ]
    },
    {
        name: "dmesg",
        category: "system",
        description: "Print kernel ring buffer messages. Useful for diagnosing hardware and driver issues.",
        syntax: "dmesg [options]",
        flags: [
            { flag: "-T", desc: "Print human-readable timestamps." },
            { flag: "-H", desc: "Enable human-readable output." },
            { flag: "-w", desc: "Wait for new messages (tail like)." }
        ],
        examples: [
            { desc: "Show kernel logs with human-readable timestamps:", code: "dmesg -T" },
            { desc: "Follow kernel messages in real-time:", code: "dmesg -wH" }
        ]
    },
    {
        name: "tar",
        category: "compress",
        description: "Archive utility. Create, extract, and manipulate tar archives. Often combined with gzip/bzip2 compression.",
        syntax: "tar [OPTION...] [FILE]...",
        flags: [
            { flag: "-c", desc: "Create a new archive." },
            { flag: "-x", desc: "Extract files from an archive." },
            { flag: "-z", desc: "Filter the archive through gzip." },
            { flag: "-v", desc: "Verbosely list files processed." },
            { flag: "-f", desc: "Use archive file or device ARCHIVE." }
        ],
        examples: [
            { desc: "Create a gzipped tar archive of a directory:", code: "tar -czvf archive.tar.gz /path/to/dir" },
            { desc: "Extract a gzipped tar archive:", code: "tar -xzvf archive.tar.gz" }
        ]
    },
    {
        name: "gzip",
        category: "compress",
        description: "Compress files using Lempel-Ziv coding (LZ77). Creates .gz files.",
        syntax: "gzip [OPTION]... [FILE]...",
        flags: [
            { flag: "-d", desc: "Decompress." },
            { flag: "-k", desc: "Keep (don't delete) input files." },
            { flag: "-r", desc: "Travel the directory structure recursively." }
        ],
        examples: [
            { desc: "Compress a file:", code: "gzip file.txt" },
            { desc: "Decompress a .gz file keeping the original:", code: "gzip -dk file.txt.gz" }
        ]
    },
    {
        name: "zip",
        category: "compress",
        description: "Package and compress files into ZIP archives for cross-platform compatibility.",
        syntax: "zip [-options] [-b path] [-t mmddyyyy] [-n suffixes] [zipfile list] [-xi list]",
        flags: [
            { flag: "-r", desc: "Travel the directory structure recursively." },
            { flag: "-e", desc: "Encrypt the contents of the zip archive using a password." },
            { flag: "-u", desc: "Update existing entries in the zip archive." }
        ],
        examples: [
            { desc: "Create a ZIP archive of a directory:", code: "zip -r archive.zip folder/" },
            { desc: "Create an encrypted ZIP archive:", code: "zip -e secure.zip file.txt" }
        ]
    },
    {
        name: "unzip",
        category: "compress",
        description: "Extract files from ZIP archives.",
        syntax: "unzip [-Z] [-opts[modifiers]] file[.zip] [list] [-x xlist] [-d exdir]",
        flags: [
            { flag: "-d", desc: "An optional directory to which to extract files." },
            { flag: "-l", desc: "List archive files (short format)." },
            { flag: "-o", desc: "Overwrite existing files without prompting." }
        ],
        examples: [
            { desc: "Extract a ZIP file to the current directory:", code: "unzip archive.zip" },
            { desc: "Extract a ZIP file to a specific directory:", code: "unzip archive.zip -d /path/to/dest/" }
        ]
    },
    {
        name: "useradd",
        category: "users",
        description: "Create a new user account with home directory, shell, and group assignments.",
        syntax: "useradd [options] LOGIN",
        flags: [
            { flag: "-m", desc: "Create the user's home directory." },
            { flag: "-s", desc: "The name of the user's login shell." },
            { flag: "-G", desc: "A list of supplementary groups which the user is also a member of." }
        ],
        examples: [
            { desc: "Create a new user with a home directory and bash shell:", code: "sudo useradd -m -s /bin/bash newuser" },
            { desc: "Create a user and add to multiple groups:", code: "sudo useradd -m -G sudo,docker developer" }
        ]
    },
    {
        name: "usermod",
        category: "users",
        description: "Modify an existing user account properties.",
        syntax: "usermod [options] LOGIN",
        flags: [
            { flag: "-aG", desc: "Append the user to the supplemental GROUPS mentioned." },
            { flag: "-l", desc: "The name of the user will be changed from LOGIN to NEW_LOGIN." },
            { flag: "-s", desc: "The name of the user's new login shell." }
        ],
        examples: [
            { desc: "Add an existing user to the docker group:", code: "sudo usermod -aG docker suhas" },
            { desc: "Change a user's default shell:", code: "sudo usermod -s /bin/zsh suhas" }
        ]
    },
    {
        name: "userdel",
        category: "users",
        description: "Delete a user account and optionally their home directory.",
        syntax: "userdel [options] LOGIN",
        flags: [
            { flag: "-r", desc: "Files in the user's home directory will be removed along with the home directory itself." },
            { flag: "-f", desc: "Force the removal of the user account, even if the user is still logged in." }
        ],
        examples: [
            { desc: "Delete a user account:", code: "sudo userdel olduser" },
            { desc: "Delete a user account and remove their home directory:", code: "sudo userdel -r olduser" }
        ]
    },
    {
        name: "passwd",
        category: "users",
        description: "Change user password. Admins can set/reset passwords for other users.",
        syntax: "passwd [options] [LOGIN]",
        flags: [
            { flag: "-l", desc: "Lock the password of the named account." },
            { flag: "-u", desc: "Unlock the password of the named account." },
            { flag: "-d", desc: "Delete a user's password (make it empty)." }
        ],
        examples: [
            { desc: "Change your own password:", code: "passwd" },
            { desc: "Change the password for another user (requires root):", code: "sudo passwd suhas" }
        ]
    },
    {
        name: "su",
        category: "users",
        description: "Switch user identity. Run a shell as another user.",
        syntax: "su [options] [-] [USER [arg]...]",
        flags: [
            { flag: "-", desc: "Start the shell as a login shell with an environment similar to a real login." },
            { flag: "-c", desc: "Pass command to the invoked shell using its -c option." }
        ],
        examples: [
            { desc: "Switch to the root user with their environment:", code: "su -" },
            { desc: "Run a single command as another user:", code: "su -c 'ls -l' postgres" }
        ]
    },
    {
        name: "sudo",
        category: "users",
        description: "Execute a command as the superuser or another user with elevated privileges.",
        syntax: "sudo [options] [-u user] command",
        flags: [
            { flag: "-i", desc: "Run the shell specified by the target user's password database entry as a login shell." },
            { flag: "-u", desc: "Run the command as a user other than the default target user (usually root)." },
            { flag: "-l", desc: "List the allowed (and forbidden) commands for the invoking user." }
        ],
        examples: [
            { desc: "Run a command with root privileges:", code: "sudo apt update" },
            { desc: "Open a root login shell:", code: "sudo -i" }
        ]
    }
];

const networkCommands = [
    {
        name: "ip",
        category: "interface",
        description: "Show/manipulate routing, network devices, interfaces. The modern replacement for ifconfig. Can manage addresses, links, routes, tunnels.",
        syntax: "ip [ OPTIONS ] OBJECT { COMMAND | help }",
        flags: [
            { flag: "-c", desc: "Use color output." },
            { flag: "-br", desc: "Print only basic information in a tabular format for better readability." },
            { flag: "-4", desc: "Shortcut for 'ip -family inet'. Only show IPv4." },
            { flag: "-6", desc: "Shortcut for 'ip -family inet6'. Only show IPv6." }
        ],
        examples: [
            { desc: "Show brief summary of all network interfaces:", code: "ip -c -br addr" },
            { desc: "Show the current routing table:", code: "ip route" }
        ]
    },
    {
        name: "ifconfig",
        category: "interface",
        description: "Configure and display network interface parameters. Legacy tool replaced by ip but still widely used.",
        syntax: "ifconfig [-a] [-v] [-s] <interface> [[<AF>] <address>]",
        flags: [
            { flag: "-a", desc: "Display all interfaces which are currently available, even if down." },
            { flag: "-s", desc: "Display a short list (like netstat -i)." }
        ],
        examples: [
            { desc: "Display information for all active interfaces:", code: "ifconfig" },
            { desc: "Bring an interface up:", code: "sudo ifconfig eth0 up" }
        ]
    },
    {
        name: "iwconfig",
        category: "interface",
        description: "Configure wireless network interfaces. Display and change wireless-specific settings like ESSID, frequency, mode.",
        syntax: "iwconfig [interface] [parameters]",
        flags: [
            { flag: "essid", desc: "Set the ESSID (network name)." },
            { flag: "mode", desc: "Set the operating mode (e.g., Managed, Ad-Hoc)." }
        ],
        examples: [
            { desc: "Display wireless information for all interfaces:", code: "iwconfig" },
            { desc: "Connect to a wireless network (unencrypted):", code: "sudo iwconfig wlan0 essid 'NetworkName'" }
        ]
    },
    {
        name: "ping",
        category: "connectivity",
        description: "Send ICMP ECHO_REQUEST packets to test network connectivity. Measures round-trip time and packet loss.",
        syntax: "ping [OPTIONS] destination",
        flags: [
            { flag: "-c", desc: "Stop after sending count ECHO_REQUEST packets." },
            { flag: "-i", desc: "Wait interval seconds between sending each packet." },
            { flag: "-q", desc: "Quiet output. Nothing is displayed except the summary lines at startup time and when finished." }
        ],
        examples: [
            { desc: "Ping a host 4 times and stop:", code: "ping -c 4 google.com" },
            { desc: "Ping the loopback interface to test the local TCP/IP stack:", code: "ping 127.0.0.1" }
        ]
    },
    {
        name: "traceroute",
        category: "connectivity",
        description: "Print the route packets take to a network host. Shows each hop with latency.",
        syntax: "traceroute [OPTIONS] host",
        flags: [
            { flag: "-I", desc: "Use ICMP ECHO for probes." },
            { flag: "-p", desc: "Set the base UDP port number used in probes." },
            { flag: "-m", desc: "Set the max time-to-live (max number of hops) used in outgoing probe packets." }
        ],
        examples: [
            { desc: "Trace the route to a host using UDP:", code: "traceroute google.com" },
            { desc: "Trace the route using ICMP (often gets through firewalls better):", code: "sudo traceroute -I google.com" }
        ]
    },
    {
        name: "tracepath",
        category: "connectivity",
        description: "Trace the path to a destination discovering MTU along the path. No root privileges required unlike traceroute.",
        syntax: "tracepath [OPTIONS] destination",
        flags: [
            { flag: "-n", desc: "Print primarily IP addresses numerically." },
            { flag: "-b", desc: "Print both host names and IP addresses." }
        ],
        examples: [
            { desc: "Trace path to a domain:", code: "tracepath example.com" },
            { desc: "Trace path and discover MTU without resolving hostnames:", code: "tracepath -n example.com" }
        ]
    },
    {
        name: "mtr",
        category: "connectivity",
        description: "Combines functionality of traceroute and ping in a single network diagnostic tool with real-time updates.",
        syntax: "mtr [OPTIONS] hostname",
        flags: [
            { flag: "-r", desc: "Report mode. mtr will send 10 cycles of pings and then print the statistics and exit." },
            { flag: "-c", desc: "Set the number of pings sent to determine both the machines on the network and the reliability of those machines." },
            { flag: "-w", desc: "Wide report mode. Display report without truncating hostnames." }
        ],
        examples: [
            { desc: "Run mtr interactively:", code: "mtr google.com" },
            { desc: "Generate a report after 10 pings to each hop:", code: "mtr -r -c 10 google.com" }
        ]
    },
    {
        name: "nslookup",
        category: "dns",
        description: "Query DNS nameservers interactively or non-interactively. Look up IP addresses, mail servers, nameservers.",
        syntax: "nslookup [-[option]] [name | -] [server]",
        flags: [
            { flag: "-type", desc: "Query a specific DNS record type (A, MX, TXT, etc.)." },
            { flag: "-timeout", desc: "Set the timeout for queries." }
        ],
        examples: [
            { desc: "Lookup the A record for a domain:", code: "nslookup example.com" },
            { desc: "Lookup the MX records for a domain:", code: "nslookup -type=mx example.com" }
        ]
    },
    {
        name: "dig",
        category: "dns",
        description: "DNS lookup utility. Provides detailed DNS query information including TTL, record types, and authority.",
        syntax: "dig [@server] [-b address] [-c class] [-f filename] [-k filename] [-m] [-p port#] [-q name] [-t type] [-v] [-x addr] [-y [hmac:]name:key] [-4] [-6] [name] [type] [class] [queryopt...]",
        flags: [
            { flag: "+short", desc: "Provide a terse answer." },
            { flag: "+trace", desc: "Toggle tracing of the delegation path from the root name servers for the name being looked up." },
            { flag: "-x", desc: "Perform a reverse lookup mapping an address to a name." }
        ],
        examples: [
            { desc: "Get all DNS records for a domain:", code: "dig example.com ANY" },
            { desc: "Get just the IP address associated with a domain:", code: "dig +short example.com" }
        ]
    },
    {
        name: "host",
        category: "dns",
        description: "Simple DNS lookup utility. Converts names to IP addresses and vice versa.",
        syntax: "host [-aCdlriTwv] [-c class] [-N ndots] [-t type] [-W time] [-R number] [-m flag] hostname [server]",
        flags: [
            { flag: "-t", desc: "Specify the query type." },
            { flag: "-a", desc: "Equivalent to setting the query type to ANY." }
        ],
        examples: [
            { desc: "Lookup IP for a domain:", code: "host example.com" },
            { desc: "Perform a reverse DNS lookup on an IP address:", code: "host 8.8.8.8" }
        ]
    },
    {
        name: "resolvectl",
        category: "dns",
        description: "Resolve domain names, IPv4/IPv6 addresses, DNS resource records using systemd-resolved.",
        syntax: "resolvectl [OPTIONS...] {COMMAND} [NAME...]",
        flags: [
            { flag: "status", desc: "Show the global and per-link DNS settings currently in effect." },
            { flag: "query", desc: "Resolve domain names, as well as IPv4 and IPv6 addresses." },
            { flag: "flush-caches", desc: "Flush all DNS resource record caches." }
        ],
        examples: [
            { desc: "Show current DNS settings:", code: "resolvectl status" },
            { desc: "Flush the DNS cache:", code: "resolvectl flush-caches" }
        ]
    },
    {
        name: "netstat",
        category: "connections",
        description: "Print network connections, routing tables, interface statistics. Shows listening ports and established connections.",
        syntax: "netstat [address_family_options] [--tcp|-t] [--udp|-u] [--udplite|-U] [--sctp|-S] [--raw|-w] [--listening|-l] [--all|-a] [--numeric|-n] [--numeric-hosts] [--numeric-ports] [--numeric-users] [--symbolic|-N] [--extend|-e[--extend|-e]] [--timers|-o] [--program|-p] [--verbose|-v] [--continuous|-c] [--wide|-W]",
        flags: [
            { flag: "-t", desc: "Show TCP ports." },
            { flag: "-u", desc: "Show UDP ports." },
            { flag: "-l", desc: "Show only listening sockets." },
            { flag: "-n", desc: "Show numerical addresses instead of trying to determine symbolic host, port or user names." },
            { flag: "-p", desc: "Show the PID and name of the program to which each socket belongs." }
        ],
        examples: [
            { desc: "List all listening TCP and UDP ports with the program using them:", code: "sudo netstat -tulnp" },
            { desc: "Display all active connections with numerical IP addresses:", code: "netstat -ant" }
        ]
    },
    {
        name: "ss",
        category: "connections",
        description: "Socket statistics. Modern replacement for netstat. Faster and more information about TCP and socket connections.",
        syntax: "ss [options] [ FILTER ]",
        flags: [
            { flag: "-t", desc: "Display TCP sockets." },
            { flag: "-u", desc: "Display UDP sockets." },
            { flag: "-l", desc: "Display only listening sockets." },
            { flag: "-p", desc: "Show process using socket." },
            { flag: "-n", desc: "Do not try to resolve service names." }
        ],
        examples: [
            { desc: "Show all listening TCP ports and the process using them:", code: "sudo ss -tlnp" },
            { desc: "Show all established TCP connections:", code: "ss -t state established" }
        ]
    },
    {
        name: "lsof",
        category: "connections",
        description: "List open files including network connections. Can find which process is using a specific port.",
        syntax: "lsof [ -?abChKlnNoOPRtUvVX ] [ -A A ] [ -c c ] [ +c c ] [ +|-d d ] [ +|-D D ] [ +|-e s ] [ +|-E ] [ +|-f [cfgGn] ] [ -F [f] ] [ -g [s] ] [ -i [i] ] [ -k k ] [ -m m ] [ +|-M ] [ -o [o] ] [ -p s ] [ +|-r [t[m<fmt>]] ] [ -s [p:s] ] [ -S [t] ] [ -T [t] ] [ -u s ] [ +|-w ] [ -x [fl] ] [ -z [z] ] [ -Z [Z] ] [ -- ] [names]",
        flags: [
            { flag: "-i", desc: "Selects the listing of files any of whose Internet address matches the address specified." },
            { flag: "-P", desc: "Inhibits the conversion of port numbers to port names for network files." },
            { flag: "-n", desc: "Inhibits the conversion of network numbers to host names for network files." }
        ],
        examples: [
            { desc: "Find which process is listening on port 8080:", code: "sudo lsof -i :8080" },
            { desc: "List all open network connections for a specific user:", code: "lsof -i -u suhas" }
        ]
    },
    {
        name: "curl",
        category: "transfer",
        description: "Transfer data from or to a server using various protocols (HTTP, FTP, etc.). Supports headers, auth, cookies.",
        syntax: "curl [options / URLs]",
        flags: [
            { flag: "-O", desc: "Write output to a local file named like the remote file we get." },
            { flag: "-I", desc: "Fetch the headers only." },
            { flag: "-X", desc: "Specify request command to use (e.g., GET, POST)." },
            { flag: "-d", desc: "Sends the specified data in a POST request to the HTTP server." }
        ],
        examples: [
            { desc: "Download a file and save it with its original name:", code: "curl -O https://example.com/file.tar.gz" },
            { desc: "Send a POST request with JSON data:", code: "curl -X POST -H \"Content-Type: application/json\" -d '{\"key\":\"value\"}' https://api.example.com/data" }
        ]
    },
    {
        name: "wget",
        category: "transfer",
        description: "Non-interactive network downloader. Download files from the web with retry and recursive capabilities.",
        syntax: "wget [option]... [URL]...",
        flags: [
            { flag: "-O", desc: "Write documents to FILE." },
            { flag: "-c", desc: "Resume getting a partially-downloaded file." },
            { flag: "-r", desc: "Turn on recursive retrieving." }
        ],
        examples: [
            { desc: "Download a file and resume if interrupted:", code: "wget -c https://example.com/large_file.iso" },
            { desc: "Download an entire website recursively for offline viewing:", code: "wget -r -p -k https://example.com" }
        ]
    },
    {
        name: "scp",
        category: "transfer",
        description: "Secure copy over SSH. Transfer files between local and remote hosts with encryption.",
        syntax: "scp [OPTIONS] [[user@]host1:]file1 ... [[user@]host2:]file2",
        flags: [
            { flag: "-r", desc: "Recursively copy entire directories." },
            { flag: "-P", desc: "Specifies the port to connect to on the remote host." },
            { flag: "-i", desc: "Selects the file from which the identity (private key) for public key authentication is read." }
        ],
        examples: [
            { desc: "Copy a file from local to a remote server:", code: "scp file.txt user@remote:/path/to/destination" },
            { desc: "Recursively copy a directory from a remote server to local:", code: "scp -r user@remote:/path/to/source /local/dest" }
        ]
    },
    {
        name: "rsync",
        category: "transfer",
        description: "Fast, versatile file copying tool. Efficient incremental transfers using delta encoding.",
        syntax: "rsync [OPTION...] SRC... [DEST]",
        flags: [
            { flag: "-a", desc: "Archive mode; equals -rlptgoD (no -H,-A,-X)." },
            { flag: "-v", desc: "Increase verbosity." },
            { flag: "-z", desc: "Compress file data during the transfer." },
            { flag: "-P", desc: "Show progress during transfer and keep partially transferred files." }
        ],
        examples: [
            { desc: "Synchronize a local directory to a remote server:", code: "rsync -avzP /local/dir/ user@remote:/remote/dir/" },
            { desc: "Copy files locally preserving permissions and showing progress:", code: "rsync -avP /src/ /dest/" }
        ]
    },
    {
        name: "ftp",
        category: "transfer",
        description: "File Transfer Protocol client. Interactive file transfer to/from remote servers.",
        syntax: "ftp [-options] [host [port]]",
        flags: [
            { flag: "-p", desc: "Use passive mode for data transfers." },
            { flag: "-i", desc: "Turns off interactive prompting during multiple file transfers." }
        ],
        examples: [
            { desc: "Connect to an FTP server:", code: "ftp ftp.example.com" },
            { desc: "Download a file interactively (inside ftp prompt):", code: "get filename.txt" }
        ]
    },
    {
        name: "ssh",
        category: "remote",
        description: "OpenSSH client for secure remote login. Execute commands on remote machines with encrypted communication.",
        syntax: "ssh [OPTIONS] [user@]hostname [command]",
        flags: [
            { flag: "-p", desc: "Port to connect to on the remote host." },
            { flag: "-i", desc: "Selects a file from which the identity (private key) is read." },
            { flag: "-L", desc: "Specifies that the given port on the local host is to be forwarded to the given host and port on the remote side." }
        ],
        examples: [
            { desc: "Connect to a remote server:", code: "ssh user@hostname" },
            { desc: "Run a command on a remote server without opening a shell:", code: "ssh user@hostname 'ls -la'" }
        ]
    },
    {
        name: "telnet",
        category: "remote",
        description: "User interface to the TELNET protocol. Used for testing TCP connections to specific ports.",
        syntax: "telnet [options] [host [port]]",
        flags: [
            { flag: "-l", desc: "Specify the user to log in as." }
        ],
        examples: [
            { desc: "Connect to a telnet server:", code: "telnet example.com" },
            { desc: "Test if a specific port is open on a host:", code: "telnet example.com 80" }
        ]
    },
    {
        name: "iptables",
        category: "firewall",
        description: "Administration tool for IPv4 packet filtering and NAT. Configure firewall rules for input, output, and forward chains.",
        syntax: "iptables -[ACD] chain rule-specification [options]",
        flags: [
            { flag: "-L", desc: "List all rules in selected chain." },
            { flag: "-A", desc: "Append one or more rules to the end of the selected chain." },
            { flag: "-p", desc: "The protocol of the rule or of the packet to check." },
            { flag: "-j", desc: "Specifies the target of the rule (ACCEPT, DROP, REJECT)." }
        ],
        examples: [
            { desc: "List all current firewall rules:", code: "sudo iptables -L -v -n" },
            { desc: "Allow incoming TCP connections on port 22 (SSH):", code: "sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT" }
        ]
    },
    {
        name: "ufw",
        category: "firewall",
        description: "Uncomplicated Firewall. Simplified interface for managing iptables rules on Ubuntu/Debian.",
        syntax: "ufw [--dry-run] [options] [rule syntax]",
        flags: [
            { flag: "enable", desc: "Enable the firewall and start it on system boot." },
            { flag: "status", desc: "Show the firewall status and rules." },
            { flag: "allow", desc: "Add an allow rule." }
        ],
        examples: [
            { desc: "Enable the firewall:", code: "sudo ufw enable" },
            { desc: "Allow incoming traffic on port 80 (HTTP):", code: "sudo ufw allow 80/tcp" }
        ]
    },
    {
        name: "firewalld",
        category: "firewall",
        description: "Dynamic firewall manager with zone-based rules. Default on RHEL/CentOS/Fedora.",
        syntax: "firewall-cmd [OPTIONS...]",
        flags: [
            { flag: "--state", desc: "Check if firewalld is running." },
            { flag: "--add-port", desc: "Add a port to a zone." },
            { flag: "--permanent", desc: "Make changes persistent across reboots." },
            { flag: "--reload", desc: "Reload firewall rules and keep state information." }
        ],
        examples: [
            { desc: "List all open ports in the public zone:", code: "sudo firewall-cmd --zone=public --list-ports" },
            { desc: "Permanently allow HTTPS traffic:", code: "sudo firewall-cmd --zone=public --add-service=https --permanent && sudo firewall-cmd --reload" }
        ]
    },
    {
        name: "tcpdump",
        category: "diagnostics",
        description: "Capture and analyze network traffic. Powerful command-line packet analyzer.",
        syntax: "tcpdump [options] [expression]",
        flags: [
            { flag: "-i", desc: "Listen on a specific interface." },
            { flag: "-n", desc: "Don't convert addresses to names." },
            { flag: "-w", desc: "Write the raw packets to a file." },
            { flag: "-r", desc: "Read packets from a file (which was created with the -w option)." }
        ],
        examples: [
            { desc: "Capture packets on a specific interface:", code: "sudo tcpdump -i eth0" },
            { desc: "Capture all traffic matching a specific port and write to a file:", code: "sudo tcpdump -i any port 80 -w web_traffic.pcap" }
        ]
    },
    {
        name: "nmap",
        category: "diagnostics",
        description: "Network exploration and security auditing. Discover hosts, services, and vulnerabilities.",
        syntax: "nmap [Scan Type(s)] [Options] {target specification}",
        flags: [
            { flag: "-sS", desc: "TCP SYN scan (stealth scan)." },
            { flag: "-p", desc: "Only scan specified ports." },
            { flag: "-A", desc: "Enable OS detection, version detection, script scanning, and traceroute." }
        ],
        examples: [
            { desc: "Scan a single host for open ports:", code: "nmap example.com" },
            { desc: "Perform an aggressive scan on an entire subnet:", code: "nmap -A 192.168.1.0/24" }
        ]
    },
    {
        name: "arp",
        category: "diagnostics",
        description: "Manipulate the system ARP cache. Display and modify the IP-to-MAC address mapping table.",
        syntax: "arp [-evn] [-H type] [-i if] -a [hostname]",
        flags: [
            { flag: "-a", desc: "Displays current ARP entries in BSD style." },
            { flag: "-d", desc: "Delete a host from the ARP table." },
            { flag: "-s", desc: "Create an ARP mapping manually." }
        ],
        examples: [
            { desc: "Display the current ARP table:", code: "arp -a" },
            { desc: "Delete a specific entry from the ARP cache:", code: "sudo arp -d 192.168.1.100" }
        ]
    },
    {
        name: "route",
        category: "diagnostics",
        description: "Show and manipulate the IP routing table. Add, delete, or modify static routes.",
        syntax: "route [-CFvnNee] [-A family |-4|-6]",
        flags: [
            { flag: "-n", desc: "Show numerical addresses instead of trying to determine symbolic host names." },
            { flag: "add", desc: "Add a new route." },
            { flag: "del", desc: "Delete a route." }
        ],
        examples: [
            { desc: "Display the kernel routing table:", code: "route -n" },
            { desc: "Add a default gateway:", code: "sudo route add default gw 192.168.1.1" }
        ]
    },
    {
        name: "nc",
        category: "diagnostics",
        description: "Netcat, the networking Swiss Army knife. Read/write data across network connections. Port scanning, file transfer, chat.",
        syntax: "nc [options] [hostname] [port[s]]",
        flags: [
            { flag: "-l", desc: "Used to specify that nc should listen for an incoming connection." },
            { flag: "-p", desc: "Specifies the source port nc should use." },
            { flag: "-v", desc: "Have nc give more verbose output." },
            { flag: "-z", desc: "Specifies that nc should just scan for listening daemons, without sending any data to them." }
        ],
        examples: [
            { desc: "Listen on a port for incoming connections:", code: "nc -l -p 12345" },
            { desc: "Scan ports 20-30 on a target host:", code: "nc -zv example.com 20-30" }
        ]
    }
];

const searchIndex = [...coreCommands, ...networkCommands];

function escapeHTML(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function generateCommandHTML(cmd) {
    let flagsHTML = '';
    if (cmd.flags && cmd.flags.length > 0) {
        flagsHTML = `
            <div class="cmd-flags">
                <h5>Flags</h5>
                ${cmd.flags.map(f => `
                    <div class="flag-item">
                        <span class="flag-name">${escapeHTML(f.flag)}</span>
                        <span class="flag-desc">${escapeHTML(f.desc)}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    let examplesHTML = '';
    if (cmd.examples && cmd.examples.length > 0) {
        examplesHTML = `
            <div class="cmd-examples">
                ${cmd.examples.map(ex => `
                    <div class="example-item">
                        <div class="ex-desc">${escapeHTML(ex.desc)}</div>
                        <div class="ex-code-wrap">
                            <span class="ex-code">${escapeHTML(ex.code)}</span>
                            <button class="copy-btn" data-code="${escapeHTML(ex.code)}">
                                <i data-lucide="copy"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    return `
        <div class="command-card" data-category="${escapeHTML(cmd.category)}">
            <div class="cmd-header">
                <span class="cmd-name">${escapeHTML(cmd.name)}</span>
                <span class="cmd-category">${escapeHTML(cmd.category)}</span>
            </div>
            <div class="cmd-body">
                <p class="cmd-desc">${escapeHTML(cmd.description)}</p>
                <div class="cmd-syntax-wrap">${escapeHTML(cmd.syntax)}</div>
                ${flagsHTML}
            </div>
            ${examplesHTML}
        </div>
    `;
}
