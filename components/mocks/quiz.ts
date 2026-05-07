export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  border: string;
  bg: string;
  description: string;
  questions: Question[];
}

/* ── Wireshark ── */
const wiresharkQuestions: Question[] = [
  {
    id: 1, question: "What file extension does Wireshark use for saved captures?",
    options: [".cap", ".pcapng", ".dmp", ".pkt"],
    correct: 1,
    explanation: "Wireshark's native file format is PCAPNG (PCAP Next Generation). It also supports the older PCAP format."
  },
  {
    id: 2, question: "Which display filter shows only HTTP traffic?",
    options: ["protocol==http", "http", "tcp.port==80", "frame contains HTTP"],
    correct: 1,
    explanation: "In Wireshark display filters, simply typing the protocol name 'http' filters for all HTTP traffic."
  },
  {
    id: 3, question: "What is the difference between a capture filter and a display filter?",
    options: ["There is no difference", "Capture filters use BPF syntax; display filters use Wireshark syntax", "Capture filters are slower", "Display filters must be set before capturing"],
    correct: 1,
    explanation: "Capture filters use Berkeley Packet Filter (BPF) syntax and filter at the kernel level. Display filters use Wireshark's own syntax and filter after packets are captured."
  },
  {
    id: 4, question: "Which key combination stops a live capture?",
    options: ["Ctrl+C", "Ctrl+E", "Ctrl+S", "Ctrl+X"],
    correct: 1,
    explanation: "Ctrl+E stops the current live capture in Wireshark. Ctrl+S saves the capture."
  },
  {
    id: 5, question: "What does the color red typically indicate in Wireshark's default coloring rules?",
    options: ["TCP errors or bad checksums", "Normal traffic", "DNS queries", "ARP traffic"],
    correct: 0,
    explanation: "In Wireshark's default color scheme, red typically highlights packets with errors such as bad TCP checksums or malformed packets."
  },
  {
    id: 6, question: "Which Wireshark feature allows you to reconstruct a TCP stream?",
    options: ["Statistics > Protocol Hierarchy", "Follow > TCP Stream", "Export Objects", "Name Resolution"],
    correct: 1,
    explanation: "Follow > TCP Stream reconstructs the full TCP conversation between two endpoints from the selected packet."
  },
  {
    id: 7, question: "What does the display filter 'ip.addr==192.168.1.1' match?",
    options: ["Only packets where source IP is 192.168.1.1", "Only packets where destination IP is 192.168.1.1", "Any packet where either source or destination is 192.168.1.1", "Packets in the 192.168.1.0/24 subnet"],
    correct: 2,
    explanation: "ip.addr matches both source and destination IP addresses. Use ip.src or ip.dst to match only one direction."
  },
  {
    id: 8, question: "Which protocol is commonly used for DNS queries?",
    options: ["TCP port 53 only", "UDP port 53", "TCP port 25", "UDP port 67"],
    correct: 1,
    explanation: "DNS primarily uses UDP port 53 for queries. TCP port 53 is used for zone transfers and large responses."
  },
  {
    id: 9, question: "What does TShark stand for?",
    options: ["Terminal Shark", "Text-mode Shark", "Tiny Shark", "Trace Shark"],
    correct: 1,
    explanation: "TShark is Wireshark's text-mode (command-line) counterpart for capturing and analyzing packets without a GUI."
  },
  {
    id: 10, question: "Which capture filter would capture only traffic on port 443?",
    options: ["port 443", "tcp.port==443", "http.port==443", "ip.port==443"],
    correct: 0,
    explanation: "In BPF capture filter syntax, 'port 443' captures all traffic (TCP and UDP) on port 443. tcp.port==443 is display filter syntax."
  },
  {
    id: 11, question: "What does the 'Expert Info' dialog show?",
    options: ["Packet byte details", "Errors, warnings, and notes about the capture", "Interface statistics only", "Protocol hierarchy"],
    correct: 1,
    explanation: "Expert Info provides a summary of errors, warnings, notes, and chat messages detected across all packets in the capture."
  },
  {
    id: 12, question: "Which display filter shows packets with the SYN flag set?",
    options: ["tcp.flags.syn==1", "tcp.syn", "tcp[13] & 2", "All of the above"],
    correct: 3,
    explanation: "All three expressions are valid ways to detect SYN packets in Wireshark. tcp.flags.syn==1 and tcp.syn are the most readable."
  },
  {
    id: 13, question: "What is promiscuous mode in packet capturing?",
    options: ["A mode that only captures broadcast traffic", "A mode that captures all packets on the network segment, not just those addressed to the interface", "A mode that encrypts captured data", "A mode that only captures unicast traffic"],
    correct: 1,
    explanation: "Promiscuous mode instructs the network interface to capture all packets on the wire, not just those destined for its MAC address."
  },
  {
    id: 14, question: "Which feature allows you to export files from HTTP traffic?",
    options: ["File > Export Specified Packets", "File > Export Objects > HTTP", "Statistics > HTTP", "Follow > HTTP Stream"],
    correct: 1,
    explanation: "File > Export Objects > HTTP lets you extract files transferred over HTTP from the captured traffic."
  },
  {
    id: 15, question: "What does the 'Delta' column in Wireshark represent?",
    options: ["Packet size difference", "Time relative to the previous displayed packet", "Checksum delta", "Protocol version difference"],
    correct: 1,
    explanation: "The Delta column shows the time difference between the current packet and the previous displayed packet, useful for timing analysis."
  },
  {
    id: 16, question: "Which protocol operates at the Transport layer (Layer 4) of the OSI model?",
    options: ["HTTP", "TCP", "IP", "Ethernet"],
    correct: 1,
    explanation: "TCP (Transmission Control Protocol) operates at Layer 4 (Transport). HTTP is Layer 7, IP is Layer 3, Ethernet is Layer 2."
  },
  {
    id: 17, question: "What does the display filter 'frame.len > 1000' show?",
    options: ["Frames with more than 1000 packets", "Frames larger than 1000 bytes", "Frames captured after 1000 seconds", "Frames with 1000+ errors"],
    correct: 1,
    explanation: "frame.len represents the total frame length in bytes. 'frame.len > 1000' filters for packets larger than 1000 bytes."
  },
];

/* ── Nmap ── */
const nmapQuestions: Question[] = [
  {
    id: 1, question: "What does the -sS flag do in Nmap?",
    options: ["UDP scan", "TCP SYN scan", "Service version detection", "OS detection"],
    correct: 1,
    explanation: "-sS performs a TCP SYN scan (half-open scan), sending SYN packets without completing the handshake."
  },
  {
    id: 2, question: "Which Nmap flag enables OS detection?",
    options: ["-sV", "-O", "-A", "-sS"],
    correct: 1,
    explanation: "-O enables OS detection by analyzing TCP/IP stack fingerprinting. -A enables OS detection, version detection, script scanning, and traceroute."
  },
  {
    id: 3, question: "What is the default scan type when running nmap <target> without flags?",
    options: ["UDP scan (-sU)", "TCP SYN scan (-sS)", "TCP Connect scan (-sT)", "Ping scan (-sn)"],
    correct: 1,
    explanation: "When run as root, Nmap defaults to TCP SYN scan (-sS). As a non-root user, it falls back to TCP Connect scan (-sT)."
  },
  {
    id: 4, question: "Which flag performs a ping sweep without port scanning?",
    options: ["-sP", "-sn", "-Pn", "-PE"],
    correct: 1,
    explanation: "-sn (formerly -sP) performs host discovery only without port scanning. -Pn skips host discovery entirely."
  },
  {
    id: 5, question: "What does -p- scan?",
    options: ["The top 1000 ports", "All 65535 TCP ports", "Common service ports", "Ports in /etc/services"],
    correct: 1,
    explanation: "-p- tells Nmap to scan all 65535 TCP ports. The default is to scan the top 1000 most common ports."
  },
  {
    id: 6, question: "Which Nmap Scripting Engine (NSE) category checks for known vulnerabilities?",
    options: ["safe", "vuln", "discovery", "exploit"],
    correct: 1,
    explanation: "The 'vuln' category contains scripts that check for specific known vulnerabilities on target systems."
  },
  {
    id: 7, question: "What does -T4 do in Nmap?",
    options: ["Scans 4 threads", "Aggressive timing template", "Scans 4 ports at once", "Sleeps 4 seconds between probes"],
    correct: 1,
    explanation: "-T4 sets an aggressive timing template, making Nmap scan faster by sending probes more aggressively."
  },
  {
    id: 8, question: "Which scan type is useful for scanning UDP services?",
    options: ["-sS", "-sT", "-sU", "-sF"],
    correct: 2,
    explanation: "-sU performs a UDP scan, which is slower than TCP scans because UDP is connectionless and responses are less predictable."
  },
  {
    id: 9, question: "What does -A flag enable?",
    options: ["Aggressive scan (OS detection, version detection, script scanning, traceroute)", "Anonymous scan", "ARP scan only", "All ports scan"],
    correct: 0,
    explanation: "-A enables aggressive scan options: OS detection (-O), version scanning (-sV), script scanning (-sC), and traceroute."
  },
  {
    id: 10, question: "Which flag skips host discovery and treats all hosts as online?",
    options: ["-sn", "-Pn", "-sP", "-PS"],
    correct: 1,
    explanation: "-Pn skips the host discovery phase and assumes all specified targets are online, proceeding directly to port scanning."
  },
  {
    id: 11, question: "What does --top-ports 100 do?",
    options: ["Scans the 100 highest numbered ports", "Scans the 100 most common ports according to Nmap's statistics", "Scans ports 1-100", "Scans every 100th port"],
    correct: 1,
    explanation: "--top-ports 100 scans the 100 most frequently open ports according to Nmap's historical scanning data."
  },
  {
    id: 12, question: "Which output format is best for grep-able results?",
    options: ["-oX", "-oN", "-oG", "-oA"],
    correct: 2,
    explanation: "-oG produces grep-able output format, which is designed to be easily parsed by scripts and grep commands."
  },
  {
    id: 13, question: "What is an idle scan (-sI)?",
    options: ["A scan that uses a zombie host to hide the attacker's IP", "A scan that only runs when the network is idle", "A scan with no output", "A scan that doesn't send packets"],
    correct: 0,
    explanation: "An idle scan (-sI) uses a zombie host's predictable IP ID sequence to scan a target while hiding the attacker's IP address."
  },
  {
    id: 14, question: "Which flag enables NSE scripts with the 'default' category?",
    options: ["--script default", "-sC", "Both A and B", "--script-safe"],
    correct: 2,
    explanation: "Both --script default and -sC enable the default set of NSE scripts, which are safe and non-intrusive."
  },
  {
    id: 15, question: "What does the port state 'filtered' mean?",
    options: ["The port is open but hidden", "Nmap cannot determine if the port is open due to firewall filtering", "The port is closed", "The port requires authentication"],
    correct: 1,
    explanation: "'Filtered' means Nmap cannot determine the port state because packet filtering (firewall) prevents probes from reaching the port."
  },
  {
    id: 16, question: "What does the NSE script 'ssl-enum-ciphers' do?",
    options: ["Enumerates SSL certificates", "Lists all supported SSL/TLS cipher suites and grades their strength", "Checks for Heartbleed vulnerability", "Downloads SSL certificates"],
    correct: 1,
    explanation: "ssl-enum-ciphers enumerates all SSL/TLS cipher suites a server supports and grades them (A-F) based on their cryptographic strength."
  },
  {
    id: 17, question: "What is the purpose of the --reason flag in Nmap?",
    options: ["Explains why a port is in a particular state", "Provides a reason for the scan duration", "Gives legal justification for scanning", "Shows the reasoning behind timing choices"],
    correct: 0,
    explanation: "--reason displays why Nmap classified a port as open, closed, or filtered (e.g., 'syn-ack', 'reset', 'no-response')."
  },
];

/* ── Gobuster ── */
const gobusterQuestions: Question[] = [
  {
    id: 1, question: "What is Gobuster primarily used for?",
    options: ["Port scanning", "Directory and file brute-forcing on web servers", "Password cracking", "SSL/TLS scanning"],
    correct: 1,
    explanation: "Gobuster is a fast directory/file brute-forcing tool used to discover hidden directories, files, and DNS subdomains on web servers."
  },
  {
    id: 2, question: "Which mode is used for DNS subdomain enumeration?",
    options: ["dir", "dns", "vhost", "s3"],
    correct: 1,
    explanation: "The 'dns' mode brute-forces DNS subdomains using a wordlist. 'dir' mode brute-forces directories and files."
  },
  {
    id: 3, question: "What does the -x flag do in dir mode?",
    options: ["Sets proxy", "Specifies file extensions to search for", "Excludes status codes", "Sets threads"],
    correct: 1,
    explanation: "-x specifies file extensions to append to each wordlist entry, e.g., -x php,txt,html searches for index.php, index.txt, index.html."
  },
  {
    id: 4, question: "Which flag shows only results with a specific HTTP status code?",
    options: ["-s", "-b", "-r", "-k"],
    correct: 0,
    explanation: "-s specifies which status codes to show (e.g., -s 200,301,401). By default, Gobuster shows all status codes."
  },
  {
    id: 5, question: "What does the -w flag specify?",
    options: ["Number of worker threads", "Wordlist path", "Timeout duration", "Output file"],
    correct: 1,
    explanation: "-w specifies the path to the wordlist file that Gobuster uses for brute-forcing."
  },
  {
    id: 6, question: "Which mode discovers virtual hosts on a target?",
    options: ["dir", "dns", "vhost", "fuzz"],
    correct: 2,
    explanation: "The 'vhost' mode brute-forces virtual hosts by sending HTTP requests with different Host headers."
  },
  {
    id: 7, question: "What does -t 50 do?",
    options: ["Sets timeout to 50 seconds", "Uses 50 threads for concurrent requests", "Tests 50 directories", "Tries 50 times per URL"],
    correct: 1,
    explanation: "-t sets the number of concurrent threads. -t 50 runs 50 threads simultaneously for faster scanning."
  },
  {
    id: 8, question: "Which flag hides results with specific status codes?",
    options: ["-s", "-b", "-r", "--no-error"],
    correct: 1,
    explanation: "-b (or --status-codes-blacklist) hides results with the specified status codes, opposite of -s."
  },
  {
    id: 9, question: "What is the s3 mode used for?",
    options: ["Scanning SMB shares", "Enumerating Amazon S3 buckets", "Scanning SQL databases", "Finding SSL certificates"],
    correct: 1,
    explanation: "The 's3' mode enumerates Amazon S3 buckets by brute-forcing bucket names against Amazon's S3 service."
  },
  {
    id: 10, question: "Which flag follows redirects?",
    options: ["-r", "-f", "-k", "--redirect"],
    correct: 0,
    explanation: "-r (or --follow-redirect) tells Gobuster to follow HTTP redirects and show the final response."
  },
  {
    id: 11, question: "What does -o do in Gobuster?",
    options: ["Sets output format", "Specifies output file", "Enables verbose mode", "Sets timeout"],
    correct: 1,
    explanation: "-o specifies the output file path where Gobuster writes its results."
  },
  {
    id: 12, question: "Which flag disables TLS certificate verification?",
    options: ["--insecure", "-k", "Both A and B", "--no-tls"],
    correct: 2,
    explanation: "Both --insecure and -k disable TLS certificate verification, useful for testing sites with self-signed certificates."
  },
  {
    id: 13, question: "What does the fuzz mode do?",
    options: ["Fuzzes DNS records", "Replaces a keyword in a URL with wordlist entries", "Fuzzes file uploads", "Fuzzes HTTP headers randomly"],
    correct: 1,
    explanation: "The 'fuzz' mode replaces a placeholder (FUZZ keyword) in a URL or request with entries from the wordlist."
  },
  {
    id: 14, question: "What HTTP method does Gobuster use by default in dir mode?",
    options: ["POST", "GET", "HEAD", "OPTIONS"],
    correct: 1,
    explanation: "Gobuster's dir mode uses GET requests by default to probe for directories and files."
  },
  {
    id: 15, question: "Which flag adds custom HTTP headers?",
    options: ["-H", "-h", "--header", "Both A and C"],
    correct: 3,
    explanation: "Both -H and --header allow specifying custom HTTP headers, e.g., -H 'Cookie: session=abc123'."
  },
];

/* ── John the Ripper ── */
const johnQuestions: Question[] = [
  {
    id: 1, question: "What is John the Ripper primarily used for?",
    options: ["Network scanning", "Password hash cracking", "Web directory brute-forcing", "SSL/TLS analysis"],
    correct: 1,
    explanation: "John the Ripper is one of the most popular password cracking tools, supporting numerous hash formats."
  },
  {
    id: 2, question: "Which cracking mode tries variations of the username as passwords?",
    options: ["Wordlist mode", "Single crack mode", "Incremental mode", "External mode"],
    correct: 1,
    explanation: "Single crack mode uses GECOS information (like username) and applies mangling rules to generate candidate passwords."
  },
  {
    id: 3, question: "What does the --wordlist flag specify?",
    options: ["Output file", "A file containing candidate passwords", "The hash file", "John's config file"],
    correct: 1,
    explanation: "--wordlist specifies a file containing candidate passwords (one per line) that John will try against the hash."
  },
  {
    id: 4, question: "Which flag shows cracked passwords?",
    options: ["--show", "--display", "--cracked", "--results"],
    correct: 0,
    explanation: "--show displays previously cracked passwords from the john.pot file for the specified hash file."
  },
  {
    id: 5, question: "What is incremental mode?",
    options: ["A mode that increments the wordlist size", "Brute-force mode trying all character combinations", "A mode that increases CPU cores gradually", "A mode that adds numbers to passwords"],
    correct: 1,
    explanation: "Incremental mode is John's brute-force approach, trying all possible character combinations up to a certain length."
  },
  {
    id: 6, question: "Which utility extracts hashes from password-protected ZIP files?",
    options: ["zip2john", "rar2john", "keepass2john", "pdf2john"],
    correct: 0,
    explanation: "zip2john extracts password hashes from ZIP archives so John can attempt to crack them."
  },
  {
    id: 7, question: "What does --format=sha512crypt specify?",
    options: ["The output format", "The hash type to crack", "The encoding format", "The wordlist format"],
    correct: 1,
    explanation: "--format specifies the hash algorithm/type John should expect and optimize for when cracking."
  },
  {
    id: 8, question: "Which flag continues an interrupted session?",
    options: ["--resume", "--restore", "--continue", "--session"],
    correct: 1,
    explanation: "--restore=NAME continues a previously interrupted cracking session that was named with --session."
  },
  {
    id: 9, question: "What are 'rules' in John the Ripper?",
    options: ["Configuration syntax rules", "Password mangling transformations applied to wordlist entries", "Hash format rules", "CPU usage rules"],
    correct: 1,
    explanation: "Rules are password mangling transformations (like appending numbers, case changes) applied to each wordlist entry."
  },
  {
    id: 10, question: "Which utility extracts hashes from PDF files?",
    options: ["zip2john", "rar2john", "pdf2john", "ssh2john"],
    correct: 2,
    explanation: "pdf2john extracts password hashes from PDF files for cracking. There are many 2john utilities for different formats."
  },
  {
    id: 11, question: "What does --fork=4 do?",
    options: ["Splits the wordlist into 4 parts", "Uses 4 CPU cores/processes", "Tries 4 passwords at once", "Restarts 4 times"],
    correct: 1,
    explanation: "--fork=4 forks John into 4 processes, utilizing multiple CPU cores for parallel password cracking."
  },
  {
    id: 12, question: "Which mode is best when you have a good wordlist?",
    options: ["Single crack mode", "Incremental mode", "Wordlist mode", "External mode"],
    correct: 2,
    explanation: "Wordlist mode is most effective when you have a quality wordlist containing likely passwords."
  },
  {
    id: 13, question: "What does john.pot store?",
    options: ["The wordlist", "Cracked passwords and their hashes", "Configuration settings", "Session logs"],
    correct: 1,
    explanation: "john.pot stores successfully cracked passwords along with their corresponding hashes for quick lookup."
  },
  {
    id: 14, question: "Which flag sets a custom session name?",
    options: ["--name", "--session", "--id", "--label"],
    correct: 1,
    explanation: "--session=NAME creates a named session, allowing you to restore it later with --restore=NAME."
  },
  {
    id: 15, question: "What hash format does Linux /etc/shadow typically use?",
    options: ["MD5", "SHA-256 or SHA-512 (crypt)", "NTLM", "Bcrypt only"],
    correct: 1,
    explanation: "Modern Linux systems typically use SHA-256 or SHA-512 crypt hashes in /etc/shadow. John supports these via sha256crypt and sha512crypt formats."
  },
];

/* ── Burp Suite ── */
const burpQuestions: Question[] = [
  {
    id: 1, question: "What is Burp Suite primarily used for?",
    options: ["Network packet analysis", "Web application security testing", "Password cracking", "Port scanning"],
    correct: 1,
    explanation: "Burp Suite is an integrated platform for performing security testing of web applications, developed by PortSwigger."
  },
  {
    id: 2, question: "Which Burp tool allows you to modify and resend individual HTTP requests?",
    options: ["Proxy", "Repeater", "Intruder", "Scanner"],
    correct: 1,
    explanation: "Burp Repeater lets you manually modify and resend individual HTTP requests to analyze the application's response."
  },
  {
    id: 3, question: "What does the Burp Proxy intercept feature do?",
    options: ["Scans for vulnerabilities automatically", "Captures and holds HTTP requests for manual review/modification", "Brute-forces passwords", "Decrypts SSL traffic"],
    correct: 1,
    explanation: "Proxy intercept captures HTTP/S requests between the browser and server, allowing you to review or modify them before forwarding."
  },
  {
    id: 4, question: "Which tool is used for automated payload-based attacks?",
    options: ["Proxy", "Repeater", "Intruder", "Comparer"],
    correct: 2,
    explanation: "Burp Intruder automates customized attacks by inserting payloads into specific positions in HTTP requests."
  },
  {
    id: 5, question: "What is a BApp?",
    options: ["A Burp Suite mobile app", "A Burp Extension from the BApp Store", "A Burp configuration backup", "A Burp project file"],
    correct: 1,
    explanation: "BApps are extensions available in the Burp Suite BApp Store that extend Burp's functionality."
  },
  {
    id: 6, question: "Which attack type in Intruder uses multiple payload sets simultaneously?",
    options: ["Sniper", "Battering ram", "Pitchfork", "Cluster bomb"],
    correct: 2,
    explanation: "Pitchfork attack type uses multiple payload sets simultaneously, iterating through them in parallel."
  },
  {
    id: 7, question: "What does the Burp Decoder tool do?",
    options: ["Decrypts SSL certificates", "Transforms encoded data (URL, Base64, HTML, etc.)", "Decodes JWT tokens only", "Decodes binary protocols"],
    correct: 1,
    explanation: "Burp Decoder transforms data between various encoding schemes like URL encoding, Base64, HTML entities, and hex."
  },
  {
    id: 8, question: "Which Burp feature checks for vulnerabilities automatically?",
    options: ["Proxy", "Scanner (Professional/Enterprise only)", "Repeater", "Comparer"],
    correct: 1,
    explanation: "Burp Scanner automatically crawls and audits web applications for vulnerabilities. It's available in Professional and Enterprise editions."
  },
  {
    id: 9, question: "What is the purpose of Burp Collaborator?",
    options: ["Team collaboration on projects", "Detecting out-of-band vulnerabilities by providing a unique external server", "Sharing burp configurations", "Collaborative scanning"],
    correct: 1,
    explanation: "Burp Collaborator provides a unique external server to detect out-of-band vulnerabilities like blind SQL injection and SSRF."
  },
  {
    id: 10, question: "Which attack type tries all combinations of multiple payload sets?",
    options: ["Sniper", "Battering ram", "Pitchfork", "Cluster bomb"],
    correct: 3,
    explanation: "Cluster bomb tries all combinations of multiple payload sets, making it the most comprehensive but slowest attack type."
  },
  {
    id: 11, question: "What does the 'Spider' tool do?",
    options: ["Crawls the web application to discover content and functionality", "Injects payloads", "Scans for SQL injection", "Compares responses"],
    correct: 0,
    explanation: "Burp Spider crawls the target application to map out its structure, discovering pages, forms, and parameters."
  },
  {
    id: 12, question: "What is a 'Scope' in Burp Suite?",
    options: ["The range of IP addresses to scan", "The defined target URLs that Burp should focus on", "The number of threads", "The scan depth"],
    correct: 1,
    explanation: "Scope defines which URLs/domains Burp Suite should target, helping to avoid testing out-of-scope applications."
  },
  {
    id: 13, question: "Which tool compares two responses to find differences?",
    options: ["Proxy", "Comparer", "Sequencer", "Decoder"],
    correct: 1,
    explanation: "Burp Comparer performs a visual diff between two HTTP responses, useful for analyzing how inputs affect outputs."
  },
  {
    id: 14, question: "What does Burp Sequencer analyze?",
    options: ["SQL query sequences", "The randomness quality of session tokens", "HTTP request sequences", "Attack payload sequences"],
    correct: 1,
    explanation: "Burp Sequencer performs statistical analysis on session tokens to assess their randomness and predictability."
  },
  {
    id: 15, question: "Which edition of Burp Suite is free?",
    options: ["Professional", "Enterprise", "Community", "All editions are free"],
    correct: 2,
    explanation: "Burp Suite Community Edition is free but has limited features compared to Professional and Enterprise editions."
  },
];

/* ── SQLMap ── */
const sqlmapQuestions: Question[] = [
  {
    id: 1, question: "What is SQLMap primarily used for?",
    options: ["Network scanning", "Automated SQL injection detection and exploitation", "Password cracking", "SSL/TLS scanning"],
    correct: 1,
    explanation: "SQLMap is an open-source penetration testing tool that automates the process of detecting and exploiting SQL injection flaws."
  },
  {
    id: 2, question: "Which flag specifies the target URL in SQLMap?",
    options: ["--target", "-u", "--url", "Both B and C"],
    correct: 3,
    explanation: "Both -u and --url specify the target URL in SQLMap. For example: sqlmap -u 'http://target.com/page.php?id=1'"
  },
  {
    id: 3, question: "What does --dbs do?",
    options: ["Lists all databases", "Dumps database tables", "Shows database users", "Deletes databases"],
    correct: 0,
    explanation: "--dbs enumerates the database management system's databases once SQL injection is confirmed."
  },
  {
    id: 4, question: "Which flag dumps the contents of all tables in a database?",
    options: ["--dump", "--dump-all", "--dump-tables", "--dump-db"],
    correct: 1,
    explanation: "--dump-all dumps the contents of all tables in all databases. --dump dumps a specific table."
  },
  {
    id: 5, question: "What does --level specify?",
    options: ["Number of payloads", "Tests to perform (1-5, higher = more thorough)", "Number of threads", "Injection depth"],
    correct: 1,
    explanation: "--level (1-5) specifies the level of tests to perform. Higher levels test more injection points and boundary conditions."
  },
  {
    id: 6, question: "What does --risk specify?",
    options: ["The chance of being detected", "The risk of tests (1-3, higher = more dangerous)", "Network risk assessment", "Data sensitivity level"],
    correct: 1,
    explanation: "--risk (1-3) specifies the risk of tests. Higher risk levels include tests that could cause data loss or Denial of Service."
  },
  {
    id: 7, question: "Which flag specifies which parameter to test?",
    options: ["--param", "-p", "--test-param", "Both A and B"],
    correct: 3,
    explanation: "Both -p and --param specify which GET/POST parameters to test for SQL injection."
  },
  {
    id: 8, question: "What does --os-shell attempt to do?",
    options: ["Open a database shell", "Open an interactive operating system shell via SQL injection", "Execute a single OS command", "Dump OS files"],
    correct: 1,
    explanation: "--os-shell attempts to spawn an interactive operating system shell on the database server through SQL injection."
  },
  {
    id: 9, question: "Which technique uses boolean-based blind SQL injection?",
    options: ["UNION query", "Error-based", "Boolean-based blind", "Time-based blind"],
    correct: 2,
    explanation: "Boolean-based blind SQL injection infers data by asking true/false questions and observing differences in the application's response."
  },
  {
    id: 10, question: "What does --tamper do?",
    options: ["Modifies the database", "Applies encoding/obfuscation scripts to bypass WAFs", "Changes the HTTP method", "Modifies response data"],
    correct: 1,
    explanation: "--tamper applies tamper scripts that encode or obfuscate payloads to bypass Web Application Firewalls (WAFs) and filters."
  },
  {
    id: 11, question: "Which flag lists database management system users?",
    options: ["--users", "--dbms-users", "--admins", "--accounts"],
    correct: 0,
    explanation: "--users enumerates the database management system users (DBA accounts, etc.) on the target."
  },
  {
    id: 12, question: "What does --batch do?",
    options: ["Runs multiple targets", "Uses default answers for all prompts without asking", "Batch processes results", "Runs in background"],
    correct: 1,
    explanation: "--batch uses the default option for all user prompts, allowing SQLMap to run non-interactively in scripts."
  },
  {
    id: 13, question: "Which technique uses time delays to infer data?",
    options: ["UNION query", "Error-based", "Boolean-based blind", "Time-based blind"],
    correct: 3,
    explanation: "Time-based blind SQL injection causes deliberate time delays in responses to infer whether conditions are true or false."
  },
  {
    id: 14, question: "What does --file-read attempt?",
    options: ["Read a file from the database", "Read a file from the underlying operating system", "Read SQLMap's config file", "Read the wordlist"],
    correct: 1,
    explanation: "--file-read attempts to read a file from the underlying operating system on the database server (e.g., /etc/passwd)."
  },
  {
    id: 15, question: "Which flag specifies the DBMS type?",
    options: ["--dbms", "--database", "--engine", "--type"],
    correct: 0,
    explanation: "--dbms forces SQLMap to treat the target as a specific DBMS (e.g., --dbms=mysql, --dbms=postgresql)."
  },
];

/* ── SSLScan ── */
const sslscanQuestions: Question[] = [
  {
    id: 1, question: "What is SSLScan primarily used for?",
    options: ["Scanning for open ports", "Analyzing SSL/TLS certificate and configuration", "Brute-forcing passwords", "Finding web directories"],
    correct: 1,
    explanation: "SSLScan tests SSL/TLS services to detect supported protocols, cipher suites, certificate information, and vulnerabilities."
  },
  {
    id: 2, question: "Which flag shows all supported cipher suites?",
    options: ["--show-ciphers", "--all-ciphers", "--ciphers", "--list-ciphers"],
    correct: 0,
    explanation: "--show-ciphers (or --no-failed to only show supported) displays all cipher suites that the server supports."
  },
  {
    id: 3, question: "What does the Heartbleed vulnerability affect?",
    options: ["SSLv2", "TLS 1.0", "OpenSSL 1.0.1", "All TLS versions"],
    correct: 2,
    explanation: "Heartbleed (CVE-2014-0160) affects OpenSSL versions 1.0.1 through 1.0.1f, allowing reading of server memory."
  },
  {
    id: 4, question: "Which flag checks for the Heartbleed vulnerability?",
    options: ["--heartbleed", "--check-heartbleed", "--vuln-heartbleed", "--cve-2014-0160"],
    correct: 0,
    explanation: "--heartbleed checks if the target is vulnerable to the Heartbleed vulnerability in OpenSSL."
  },
  {
    id: 5, question: "What does --starttls=ftp do?",
    options: ["Scans FTP ports", "Upgrades a plain-text FTP connection to TLS", "Starts TLS on port 21", "Uses FTP for file transfer"],
    correct: 1,
    explanation: "--starttls=ftp upgrades a plain-text FTP connection to TLS encryption before scanning SSL/TLS configuration."
  },
  {
    id: 6, question: "Which protocol should NOT be supported on modern servers?",
    options: ["TLS 1.2", "TLS 1.3", "SSLv3", "TLS 1.1"],
    correct: 2,
    explanation: "SSLv3 is considered insecure due to POODLE attack and should be disabled on all modern servers."
  },
  {
    id: 7, question: "What does --no-failed do?",
    options: ["Stops on first failure", "Hides rejected cipher suites, showing only supported ones", "Skips certificate validation", "Ignores connection errors"],
    correct: 1,
    explanation: "--no-failed suppresses output for cipher suites that the server rejected, showing only successfully negotiated ones."
  },
  {
    id: 8, question: "Which flag outputs results in XML format?",
    options: ["--xml", "--output-xml", "--xml-file", "--format-xml"],
    correct: 0,
    explanation: "--xml=filename.xml outputs the SSL scan results in XML format for programmatic parsing."
  },
  {
    id: 9, question: "What does a certificate's 'Subject Alternative Name' (SAN) contain?",
    options: ["The certificate serial number", "Additional hostnames/IPs the certificate is valid for", "The CA's name", "The certificate expiry"],
    correct: 1,
    explanation: "SAN (Subject Alternative Name) lists additional domain names and IP addresses that the certificate is valid for."
  },
  {
    id: 10, question: "Which flag checks for SSLv2 support?",
    options: ["--ssl2", "--sslv2", "--version-ssl2", "--check-ssl2"],
    correct: 1,
    explanation: "--sslv2 checks if the target supports the insecure SSLv2 protocol."
  },
  {
    id: 11, question: "What does the POODLE vulnerability target?",
    options: ["TLS 1.0", "SSLv3", "TLS 1.2", "TLS 1.3"],
    correct: 1,
    explanation: "POODLE (Padding Oracle On Downgraded Legacy Encryption) attacks SSLv3's padding in CBC mode."
  },
  {
    id: 12, question: "Which flag shows certificate subject and issuer?",
    options: ["--cert-info", "--show-certificate", "--certificate", "--get-certificate"],
    correct: 2,
    explanation: "--certificate displays detailed certificate information including subject, issuer, validity dates, and fingerprint."
  },
  {
    id: 13, question: "What does --timeout specify?",
    options: ["Scan duration limit", "Connection timeout in seconds", "Certificate expiry check", "Retry count"],
    correct: 1,
    explanation: "--timeout sets the connection timeout in seconds for each SSL/TLS test."
  },
  {
    id: 14, question: "Which TLS version is currently recommended as minimum?",
    options: ["TLS 1.0", "TLS 1.1", "TLS 1.2", "SSLv3"],
    correct: 2,
    explanation: "TLS 1.2 is the current minimum recommended version. TLS 1.0 and 1.1 are deprecated. TLS 1.3 is the latest."
  },
  {
    id: 15, question: "What is a 'cipher suite'?",
    options: ["A type of certificate", "A combination of algorithms for key exchange, authentication, encryption, and MAC", "A firewall rule", "An SSL port number"],
    correct: 1,
    explanation: "A cipher suite is a set of cryptographic algorithms that work together: key exchange, authentication, encryption, and message authentication code."
  },
];

/* ── Netcat ── */
const netcatQuestions: Question[] = [
  {
    id: 1, question: "What is Netcat often referred to as?",
    options: ["The hacker's toolbox", "The TCP/IP Swiss Army knife", "The network scanner", "The packet analyzer"],
    correct: 1,
    explanation: "Netcat is commonly called the 'TCP/IP Swiss Army knife' due to its versatility in network operations."
  },
  {
    id: 2, question: "Which flag tells Netcat to listen for incoming connections?",
    options: ["-c", "-l", "-s", "-r"],
    correct: 1,
    explanation: "-l (listen) puts Netcat into listening mode, waiting for incoming connections on the specified port."
  },
  {
    id: 3, question: "What does 'nc -lvp 4444' do?",
    options: ["Connects to port 4444", "Listens on port 4444 with verbose output", "Scans port 4444", "Sends data to port 4444"],
    correct: 1,
    explanation: "-l listens, -v enables verbose output, -p specifies the port. This creates a listener on port 4444."
  },
  {
    id: 4, question: "Which flag enables verbose output in Netcat?",
    options: ["-d", "-v", "-q", "-z"],
    correct: 1,
    explanation: "-v enables verbose mode, showing detailed connection information. -vv enables extra verbose output."
  },
  {
    id: 5, question: "What does 'nc -z target 1-1000' do?",
    options: ["Transfers a file", "Port scans target for open ports 1-1000", "Listens on ports 1-1000", "Sends 1000 packets"],
    correct: 1,
    explanation: "-z enables zero-I/O mode (scanning without sending data), making it useful for port scanning."
  },
  {
    id: 6, question: "How can Netcat be used for file transfer?",
    options: ["nc cannot transfer files", "Redirect file to nc on sender, redirect nc output to file on receiver", "Use -f flag", "Use --transfer flag"],
    correct: 1,
    explanation: "Netcat can transfer files by redirecting a file into nc on the sender and redirecting nc output to a file on the receiver."
  },
  {
    id: 7, question: "What does the -e flag do?",
    options: ["Encrypts the connection", "Executes a program after connecting", "Enables echo mode", "Sets the exit code"],
    correct: 1,
    explanation: "-e executes the specified program after a connection is established, commonly used to create reverse shells."
  },
  {
    id: 8, question: "What is a reverse shell?",
    options: ["A shell that runs backward", "The target connects back to the attacker's listener", "A shell with reversed permissions", "A shell on a reversed port"],
    correct: 1,
    explanation: "In a reverse shell, the compromised machine connects back to the attacker's listener, bypassing inbound firewall rules."
  },
  {
    id: 9, question: "Which flag specifies the source IP address?",
    options: ["-i", "-s", "-b", "-a"],
    correct: 1,
    explanation: "-s specifies the local source IP address to use for outgoing connections."
  },
  {
    id: 10, question: "What does 'nc -u' indicate?",
    options: ["Unix socket", "UDP mode", "Unbuffered mode", "Unencrypted mode"],
    correct: 1,
    explanation: "-u tells Netcat to use UDP instead of the default TCP protocol."
  },
  {
    id: 11, question: "How do you create a bind shell with Netcat?",
    options: ["nc target 4444", "nc -lvp 4444 -e /bin/bash", "nc -z target 4444", "nc -s 4444"],
    correct: 1,
    explanation: "nc -lvp 4444 -e /bin/bash listens on port 4444 and executes /bin/bash when someone connects, creating a bind shell."
  },
  {
    id: 12, question: "What does the -n flag do?",
    options: ["No DNS resolution (numeric-only)", "New connection mode", "Non-blocking mode", "No output mode"],
    correct: 0,
    explanation: "-n disables DNS name resolution, using numeric IP addresses only, which speeds up connections."
  },
  {
    id: 13, question: "Which command creates a simple chat server?",
    options: ["nc -l 1234", "nc target 1234", "nc -z 1234", "nc -e chat 1234"],
    correct: 0,
    explanation: "nc -l 1234 creates a simple listener. When someone connects with 'nc <host> 1234', they can chat bidirectionally."
  },
  {
    id: 14, question: "What does 'ncat' offer that traditional 'nc' doesn't?",
    options: ["Nothing", "SSL/TLS support, connection brokering, and more", "Better speed only", "IPv6 only"],
    correct: 1,
    explanation: "ncat (from Nmap project) adds SSL/TLS encryption, connection brokering, IPv6, and better cross-platform support."
  },
  {
    id: 15, question: "How do you scan a specific port range with Netcat?",
    options: ["nc -z target 20-80", "nc -p 20-80 target", "nc -r 20-80 target", "nc target 20,80"],
    correct: 0,
    explanation: "nc -z target 20-80 scans ports 20 through 80 on the target using zero-I/O mode."
  },
];

/* ── Metasploit ── */
const metasploitQuestions: Question[] = [
  {
    id: 1, question: "What is Metasploit?",
    options: ["A network scanner", "A penetration testing framework", "A password cracker", "A packet analyzer"],
    correct: 1,
    explanation: "Metasploit is a comprehensive penetration testing framework for developing and executing exploit code against remote target machines."
  },
  {
    id: 2, question: "What command starts the Metasploit console?",
    options: ["msfstart", "msfconsole", "msfrun", "metasploit"],
    correct: 1,
    explanation: "msfconsole is the primary interactive command-line interface for the Metasploit Framework."
  },
  {
    id: 3, question: "What does 'search' do in msfconsole?",
    options: ["Searches the internet", "Searches for modules (exploits, payloads, etc.)", "Searches target systems", "Searches log files"],
    correct: 1,
    explanation: "The search command in msfconsole searches the Metasploit module database for exploits, payloads, auxiliary modules, etc."
  },
  {
    id: 4, question: "What does 'use' do in msfconsole?",
    options: ["Uses a wordlist", "Selects a module to configure and run", "Uses a proxy", "Uses a payload"],
    correct: 1,
    explanation: "The 'use' command selects a specific module (exploit, payload, auxiliary, etc.) for configuration and execution."
  },
  {
    id: 5, question: "Which command shows the options for the current module?",
    options: ["options", "show options", "list", "info"],
    correct: 1,
    explanation: "'show options' displays all configurable options (required and optional) for the currently selected module."
  },
  {
    id: 6, question: "What does RHOSTS represent?",
    options: ["Remote hosts to attack", "Local host", "Router host", "Return host"],
    correct: 0,
    explanation: "RHOSTS specifies the target remote host(s) or IP range that the exploit will attack."
  },
  {
    id: 7, question: "What does LHOST represent?",
    options: ["Local host IP for reverse connections", "Login host", "Last host", "List host"],
    correct: 0,
    explanation: "LHOST is your local IP address that the target will connect back to when using reverse payloads."
  },
  {
    id: 8, question: "Which command sets an option value?",
    options: ["set", "config", "option", "put"],
    correct: 0,
    explanation: "'set' configures a module option, e.g., 'set RHOSTS 192.168.1.1' or 'set LHOST 10.0.0.5'."
  },
  {
    id: 9, question: "What is Meterpreter?",
    options: ["A network meter", "An advanced payload with extensive post-exploitation features", "A password meter", "A scanning tool"],
    correct: 1,
    explanation: "Meterpreter is an advanced, extensible payload that runs in memory and provides powerful post-exploitation capabilities."
  },
  {
    id: 10, question: "What does 'exploit' or 'run' command do?",
    options: ["Scans the target", "Executes the configured module against the target", "Shows exploit information", "Downloads files"],
    correct: 1,
    explanation: "'exploit' or 'run' executes the currently configured module (exploit, auxiliary, etc.) against the specified target(s)."
  },
  {
    id: 11, question: "What is an 'auxiliary' module?",
    options: ["A backup module", "A module for scanning, fuzzing, or other non-exploit tasks", "A secondary payload", "A helper script"],
    correct: 1,
    explanation: "Auxiliary modules perform tasks like scanning, fuzzing, sniffing, and denial of service that don't directly exploit vulnerabilities."
  },
  {
    id: 12, question: "Which command shows compatible payloads for an exploit?",
    options: ["show payloads", "list payloads", "payloads", "compatible"],
    correct: 0,
    explanation: "'show payloads' lists all payloads compatible with the currently selected exploit module."
  },
  {
    id: 13, question: "What does 'sessions -i' do?",
    options: ["Lists all interfaces", "Interacts with an active session", "Initializes a scan", "Installs a module"],
    correct: 1,
    explanation: "'sessions -i <id>' interacts with an active Meterpreter or shell session by its session ID."
  },
  {
    id: 14, question: "Which command saves the current configuration?",
    options: ["save", "write", "export", "backup"],
    correct: 0,
    explanation: "The 'save' command saves the current msfconsole configuration (including global variables) to a file."
  },
  {
    id: 15, question: "What does 'db_nmap' do?",
    options: ["Runs Nmap scan and stores results in Metasploit's database", "Downloads Nmap", "Updates Nmap", "Scans the database"],
    correct: 0,
    explanation: "'db_nmap' runs Nmap and automatically imports the scan results into Metasploit's database for easy target management."
  },
];

/* ── Mixed Challenge ── */
const mixedQuestions: Question[] = [
  {
    id: 1, question: "Which tool is best for analyzing network packet captures?",
    options: ["Nmap", "Wireshark", "SQLMap", "John the Ripper"],
    correct: 1,
    explanation: "Wireshark is the industry-standard tool for capturing and analyzing network packets in detail."
  },
  {
    id: 2, question: "Which flag in Nmap skips host discovery?",
    options: ["-sn", "-Pn", "-sP", "-PE"],
    correct: 1,
    explanation: "-Pn skips host discovery and treats all specified targets as online, proceeding to port scanning."
  },
  {
    id: 3, question: "What does Gobuster's 'dir' mode do?",
    options: ["Scans DNS records", "Brute-forces directories and files on web servers", "Enumerates subdomains", "Scans S3 buckets"],
    correct: 1,
    explanation: "Gobuster's 'dir' mode brute-forces web server directories and files using a wordlist."
  },
  {
    id: 4, question: "Which John the Ripper mode uses a wordlist?",
    options: ["Single crack", "Incremental", "Wordlist", "External"],
    correct: 2,
    explanation: "Wordlist mode tries passwords from a specified wordlist file."
  },
  {
    id: 5, question: "Which Burp Suite tool is used for automated attacks with payloads?",
    options: ["Proxy", "Repeater", "Intruder", "Scanner"],
    correct: 2,
    explanation: "Burp Intruder automates customized attacks by inserting payloads into specific positions in requests."
  },
  {
    id: 6, question: "What does SQLMap's --dbs flag enumerate?",
    options: ["Database tables", "Database users", "All databases", "Database columns"],
    correct: 2,
    explanation: "--dbs enumerates all available databases in the target database management system."
  },
  {
    id: 7, question: "Which SSL/TLS version should be disabled due to POODLE?",
    options: ["TLS 1.2", "TLS 1.3", "SSLv3", "TLS 1.1"],
    correct: 2,
    explanation: "SSLv3 is vulnerable to POODLE and should be disabled on all systems."
  },
  {
    id: 8, question: "What does Netcat's -e flag do?",
    options: ["Encrypts traffic", "Executes a program after connection", "Enables echo", "Sets exit code"],
    correct: 1,
    explanation: "-e executes a specified program after a connection is established, commonly used for shells."
  },
  {
    id: 9, question: "What command starts the Metasploit console?",
    options: ["msfstart", "msfconsole", "msfrun", "meta"],
    correct: 1,
    explanation: "msfconsole is the primary interactive interface for the Metasploit Framework."
  },
  {
    id: 10, question: "Which Wireshark feature reconstructs TCP conversations?",
    options: ["Export Objects", "Follow TCP Stream", "Expert Info", "Protocol Hierarchy"],
    correct: 1,
    explanation: "Follow > TCP Stream reconstructs the entire TCP conversation from the selected packet."
  },
  {
    id: 11, question: "What does Nmap's -A flag enable?",
    options: ["Anonymous scan", "Aggressive scan (OS, version, scripts, traceroute)", "ARP scan", "All ports"],
    correct: 1,
    explanation: "-A enables OS detection, version scanning, script scanning, and traceroute simultaneously."
  },
  {
    id: 12, question: "Which Burp tool compares two HTTP responses?",
    options: ["Proxy", "Comparer", "Sequencer", "Decoder"],
    correct: 1,
    explanation: "Burp Comparer performs a visual diff between two HTTP responses to highlight differences."
  },
  {
    id: 13, question: "What is SQLMap's --os-shell feature?",
    options: ["Opens a database shell", "Opens an OS shell on the target server", "Opens a local shell", "Opens a SQL prompt"],
    correct: 1,
    explanation: "--os-shell attempts to spawn an interactive operating system shell on the database server."
  },
  {
    id: 14, question: "Which Netcat flag listens for incoming connections?",
    options: ["-c", "-l", "-s", "-r"],
    correct: 1,
    explanation: "-l puts Netcat into listening mode to accept incoming connections."
  },
  {
    id: 15, question: "What does Metasploit's Meterpreter provide?",
    options: ["Network scanning", "Advanced in-memory post-exploitation capabilities", "Password cracking", "SSL analysis"],
    correct: 1,
    explanation: "Meterpreter is an advanced payload providing extensive post-exploitation features that run entirely in memory."
  },
];

export const wireshark: QuizCategory = {
  id: "wireshark", name: "Wireshark", icon: "ri-radar-line",
  color: "text-cyber-amber", border: "border-cyber-amber/30", bg: "bg-cyber-amber/20",
  description: "Packet analysis, capture filters, display filters, and protocol inspection.",
  questions: wiresharkQuestions,
};

export const nmap: QuizCategory = {
  id: "nmap", name: "Nmap", icon: "ri-radar-line",
  color: "text-cyber-cyan", border: "border-cyber-cyan/30", bg: "bg-cyber-cyan/20",
  description: "Network scanning, port enumeration, OS detection, and NSE scripting.",
  questions: nmapQuestions,
};

export const gobuster: QuizCategory = {
  id: "gobuster", name: "Gobuster", icon: "ri-folder-open-line",
  color: "text-cyber-green", border: "border-cyber-green/30", bg: "bg-cyber-green/20",
  description: "Directory brute-forcing, DNS enumeration, and virtual host discovery.",
  questions: gobusterQuestions,
};

export const john: QuizCategory = {
  id: "john", name: "John the Ripper", icon: "ri-lock-unlock-line",
  color: "text-cyber-red", border: "border-cyber-red/30", bg: "bg-cyber-red/20",
  description: "Password hash cracking with wordlist, single crack, and incremental modes.",
  questions: johnQuestions,
};

export const burp: QuizCategory = {
  id: "burp", name: "Burp Suite", icon: "ri-shield-keyhole-line",
  color: "text-orange-400", border: "border-orange-400/30", bg: "bg-orange-400/20",
  description: "Web application security testing with proxy, repeater, intruder, and scanner.",
  questions: burpQuestions,
};

export const sqlmap: QuizCategory = {
  id: "sqlmap", name: "SQLMap", icon: "ri-database-2-line",
  color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/20",
  description: "Automated SQL injection detection and exploitation.",
  questions: sqlmapQuestions,
};

export const sslscan: QuizCategory = {
  id: "sslscan", name: "SSLScan", icon: "ri-shield-check-line",
  color: "text-emerald-400", border: "border-emerald-400/30", bg: "bg-emerald-400/20",
  description: "SSL/TLS configuration analysis and vulnerability detection.",
  questions: sslscanQuestions,
};

export const netcat: QuizCategory = {
  id: "netcat", name: "Netcat", icon: "ri-terminal-line",
  color: "text-purple-400", border: "border-purple-400/30", bg: "bg-purple-400/20",
  description: "Network debugging, file transfer, banner grabbing, and shell creation.",
  questions: netcatQuestions,
};

export const metasploit: QuizCategory = {
  id: "metasploit", name: "Metasploit", icon: "ri-bug-line",
  color: "text-rose-400", border: "border-rose-400/30", bg: "bg-rose-400/20",
  description: "Exploitation framework with msfconsole, Meterpreter, and post-exploitation.",
  questions: metasploitQuestions,
};

export const mixed: QuizCategory = {
  id: "mixed", name: "Mixed Challenge", icon: "ri-questionnaire-line",
  color: "text-white", border: "border-white/30", bg: "bg-white/20",
  description: "Questions from all categories. The ultimate test of your cybersecurity knowledge!",
  questions: mixedQuestions,
};