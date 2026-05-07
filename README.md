# CyberSec Documentation

[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![CyberSec](https://img.shields.io/badge/CyberSec-050508?logo=security&logoColor=00d9ff)](https://cybersec.devctr.com)

Created by **John David L. Perez** — Interactive cybersecurity learning platform at [cybersec.devctr.com](https://cybersec.devctr.com)

## Overview

CyberSec Documentation is an interactive learning platform for cybersecurity professionals and students. Master 9 essential penetration testing tools through comprehensive documentation, command builders, hands-on labs, and knowledge quizzes.

## Features

- **Command Builders** — Toggle flags and generate ready-to-use commands for Nmap, Gobuster, John the Ripper, SQLMap, Netcat, SSLScan, and more
- **Live Examples** — Real-world command examples with explanations
- **Knowledge Quizzes** — Test your understanding with tool-specific quizzes (90+ questions)
- **Hands-on Labs** — Practice with interactive lab exercises

## Tools Covered

| Tool | Tagline | Key Sections |
|------|---------|--------------|
| **Wireshark** | Network Protocol Analyzer | Capture Filters, Display Filters, Protocol Analysis, Tshark CLI |
| **Nmap** | Network Scanner | Scan Types, NSE Scripts, Stealth Scans, Command Builder |
| **Gobuster** | Directory & Subdomain Bruteforcer | Dir Mode, DNS Mode, Vhost Mode, S3 & Fuzz |
| **John the Ripper** | Password Cracker | Single Mode, Wordlist, Incremental, Hash Extraction |
| **Burp Suite** | Web App Security | Proxy, Repeater, Intruder, Scanner |
| **SQLMap** | SQL Injection Tool | Techniques, Enumeration, Tamper Scripts, OS Shell |
| **SSLScan** | SSL/TLS Scanner | Protocols, Ciphers, Certificates, Vulnerabilities |
| **Netcat** | Networking Swiss Army Knife | Connect, Listen, Shells, Transfer |
| **Metasploit** | Pentest Framework | Exploits, Payloads, Meterpreter, Database |

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) 4
- [Framer Motion](https://www.framer.com/motion) — Animations

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the documentation.

## Linting

```bash
npm run lint
```

## Project Structure

```
app/
├── nmap/          # 12 documentation pages + lab + quiz
├── wireshark/     # Network analysis docs
├── gobuster/      # Enumeration documentation
├── john-the-ripper/
├── burp-suite/
├── sqlmap/
├── sslscan/
├── netcat/
├── metasploit/
components/
└── base/          # Reusable UI components
```