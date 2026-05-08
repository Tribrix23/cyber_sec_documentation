'use client'
import { useState, useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import CodeBlock from '@/components/base/Codeblock';
import InlineCode from '@/components/base/InlineCode';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const tamperScripts = [
  'space2comment', 'between', 'randomcase', 'charencode', 'base64encode',
  'apostrophemask', 'equaltolike', 'modsecurityversioned', 'space2dash',
  'space2hash', 'greatest', 'least', 'percentage',
];

export default function CommandBuilderPage() {
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
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-tools-line" />
          SQLMap Section 10 of 13
        </div>
        <DocHeading level={1}>SQLMap Command Builder</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Configure your SQLMap command interactively and copy the generated result.
        </p>
      </motion.div>

      <motion.section className="mt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="cyber-card p-5 md:p-6">
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
                  className={`px-4 py-2 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${builderMethod === m ? 'bg-cyber-red/10 border-cyber-red text-cyber-red' : 'bg-cyber-bg border-cyber-border text-cyber-text hover:border-cyber-red/50'}`}>
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${builderAction === a ? 'bg-cyber-red/10 border-cyber-red text-cyber-red' : 'bg-cyber-bg border-cyber-border text-cyber-text hover:border-cyber-red/50'}`}>
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
              {tamperScripts.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="mb-5">
            <label className="text-sm font-semibold text-white block mb-2">Extra Flags</label>
            <div className="flex flex-wrap gap-2">
              {['--batch', '--random-agent', '--tor', '--flush-session', '-v 3'].map((f) => (
                <button key={f} type="button" onClick={() => toggleFlag(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${builderFlags.includes(f) ? 'bg-cyber-red/10 border-cyber-red text-cyber-red' : 'bg-cyber-bg border-cyber-border text-cyber-text hover:border-cyber-red/50'}`}>
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

      <motion.section className="mt-10 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="flex gap-3">
          <a href="/sqlmap/pro-tips" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Pro Tips <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/sqlmap/examples" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-red hover:text-cyber-red transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}