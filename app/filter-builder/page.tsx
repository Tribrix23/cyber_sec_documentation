'use client'
import { useState } from 'react';
import DocHeading from '@/components/base/DocHeading';
import InlineCode from '@/components/base/InlineCode';
import Callout from '@/components/base/Callout';

const protocols = [
  'ip', 'tcp', 'udp', 'icmp', 'http', 'dns', 'ssl', 'tls',
  'arp', 'ipv6', 'ftp', 'smtp', 'dhcp', 'snmp',
];

const operators = [
  { value: '==', label: 'equals' },
  { value: '!=', label: 'not equals' },
  { value: '>', label: 'greater than' },
  { value: '<', label: 'less than' },
  { value: '>=', label: 'greater or equal' },
  { value: '<=', label: 'less or equal' },
];

const fields: Record<string, string[]> = {
  ip: ['addr', 'src', 'dst', 'proto', 'ttl', 'len'],
  tcp: ['port', 'srcport', 'dstport', 'seq', 'ack', 'flags', 'window_size'],
  udp: ['port', 'srcport', 'dstport', 'length'],
  icmp: ['type', 'code', 'checksum'],
  http: ['request', 'response', 'host', 'uri', 'method', 'user_agent'],
  dns: ['qry.name', 'qry.type', 'resp.name', 'flags.response'],
  ssl: ['handshake.type', 'record.content_type'],
  tls: ['handshake.extensions_sni', 'handshake.ciphersuite'],
  arp: ['opcode', 'src.proto_ipv4', 'dst.proto_ipv4'],
  ipv6: ['addr', 'src', 'dst', 'hlim'],
  ftp: ['request', 'response'],
  smtp: ['req', 'rsp'],
  dhcp: ['type', 'hw.type', 'hw.mac_addr'],
  snmp: ['version', 'community', 'error_status'],
};

const predefinedPresets = [
  { label: 'HTTP GET Requests', filter: 'http.request.method == "GET"' },
  { label: 'DNS Queries to Google', filter: 'dns.qry.name contains "google"' },
  { label: 'TCP SYN Packets', filter: 'tcp.flags.syn == 1 and tcp.flags.ack == 0' },
  { label: 'SSL Client Hello', filter: 'ssl.handshake.type == 1' },
  { label: 'All ICMP Traffic', filter: 'icmp' },
  { label: 'Packets > 1000 bytes', filter: 'frame.len > 1000' },
];

interface FilterRow {
  id: number;
  protocol: string;
  field: string;
  operator: string;
  value: string;
  logic: 'and' | 'or';
}

let nextId = 1;

export default function FilterBuilder() {
  const [rows, setRows] = useState<FilterRow[]>([
    { id: nextId++, protocol: 'tcp', field: 'port', operator: '==', value: '80', logic: 'and' },
  ]);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { id: nextId++, protocol: 'ip', field: 'addr', operator: '==', value: '', logic: 'and' },
    ]);
  };

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRow = (id: number, key: keyof FilterRow, val: string) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const updated = { ...r, [key]: val } as FilterRow;
        if (key === 'protocol') {
          updated.field = fields[val]?.[0] || '';
        }
        return updated;
      })
    );
  };

  const buildFilter = () => {
    const parts = rows.map((row) => {
      const proto = row.protocol;
      const field = row.field;
      const fullField = field ? `${proto}.${field}` : proto;
      const op = row.operator;
      let val = row.value;
      if (isNaN(Number(val)) && val !== 'true' && val !== 'false') {
        val = `"${val}"`;
      }
      return `${fullField} ${op} ${val}`;
    });

    let filter = parts[0] || '';
    for (let i = 1; i < parts.length; i++) {
      const logic = rows[i]?.logic || 'and';
      filter += ` ${logic} ${parts[i]}`;
    }
    setResult(filter);
  };

  const clearAll = () => {
    setRows([{ id: nextId++, protocol: 'ip', field: 'addr', operator: '==', value: '', logic: 'and' }]);
    setResult('');
  };

  const copyResult = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (filter: string) => {
    setResult(filter);
  };

  return (
      <div className="px-6 md:px-12 lg:px-16 py-10 max-w-4xl">
        <DocHeading level={1}>Filter Builder</DocHeading>
        <p className="text-cyber-text-muted leading-relaxed text-lg">
          Build Wireshark display filters interactively. Select protocol, field, operator, and value — then generate the filter string.
        </p>

        <Callout type="info">
          This tool generates <strong>display filter</strong> syntax, not BPF capture filter syntax. Display filters work on already-captured data in the Wireshark GUI or tshark -Y.
        </Callout>

        {/* Presets */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-cyber-text-muted uppercase tracking-wider mb-3">Quick Presets</h3>
          <div className="flex flex-wrap gap-2">
            {predefinedPresets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset.filter)}
                className="px-3 py-1.5 rounded-full bg-cyber-bg-card border border-cyber-border text-xs text-cyber-text-muted hover:border-cyber-cyan hover:text-cyber-cyan transition-all whitespace-nowrap"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Builder */}
        <div className="mt-8 cyber-card p-5 md:p-6">
          <h3 className="text-lg font-semibold text-white mb-5">Build Your Filter</h3>

          <div className="space-y-3">
            {rows.map((row, idx) => (
              <div key={row.id} className="flex flex-wrap items-center gap-2">
                {idx > 0 && (
                  <select
                    value={row.logic}
                    onChange={(e) => updateRow(row.id, 'logic', e.target.value)}
                    className="bg-cyber-bg border border-cyber-border rounded-md px-2 py-2 text-sm text-cyber-text focus:outline-none focus:border-cyber-cyan"
                  >
                    <option value="and">AND</option>
                    <option value="or">OR</option>
                  </select>
                )}

                <select
                  value={row.protocol}
                  onChange={(e) => updateRow(row.id, 'protocol', e.target.value)}
                  className="bg-cyber-bg border border-cyber-border rounded-md px-2 py-2 text-sm text-cyber-text focus:outline-none focus:border-cyber-cyan"
                >
                  {protocols.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>

                <span className="text-cyber-text-dim">.</span>

                <select
                  value={row.field}
                  onChange={(e) => updateRow(row.id, 'field', e.target.value)}
                  className="bg-cyber-bg border border-cyber-border rounded-md px-2 py-2 text-sm text-cyber-text focus:outline-none focus:border-cyber-cyan"
                >
                  {fields[row.protocol]?.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>

                <select
                  value={row.operator}
                  onChange={(e) => updateRow(row.id, 'operator', e.target.value)}
                  className="bg-cyber-bg border border-cyber-border rounded-md px-2 py-2 text-sm text-cyber-text focus:outline-none focus:border-cyber-cyan"
                >
                  {operators.map((op) => (
                    <option key={op.value} value={op.value}>{op.label}</option>
                  ))}
                </select>

                <input
                  type="text"
                  value={row.value}
                  onChange={(e) => updateRow(row.id, 'value', e.target.value)}
                  placeholder="value"
                  className="bg-cyber-bg border border-cyber-border rounded-md px-3 py-2 text-sm text-cyber-text placeholder:text-cyber-text-dim focus:outline-none focus:border-cyber-cyan min-w-[120px]"
                />

                {rows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-md text-cyber-text-dim hover:text-cyber-red hover:bg-cyber-red/10 transition-all"
                  >
                    <i className="ri-delete-bin-line" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={addRow}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-cyber-border text-sm text-cyber-text-muted hover:border-cyber-cyan hover:text-cyber-cyan transition-all"
            >
              <i className="ri-add-line" />
              Add Condition
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={buildFilter}
              className="px-5 py-2.5 bg-cyber-cyan text-cyber-bg font-semibold rounded-lg hover:bg-cyber-cyan-dim transition-all whitespace-nowrap glow-cyan"
            >
              Generate Filter
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="px-5 py-2.5 border border-cyber-border text-cyber-text-muted font-semibold rounded-lg hover:border-cyber-text-muted transition-all whitespace-nowrap"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 code-block overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-cyber-border bg-cyber-bg-light">
              <span className="text-xs text-cyber-text-dim font-mono">Generated Display Filter</span>
              <button
                type="button"
                onClick={copyResult}
                className="flex items-center gap-1.5 text-xs text-cyber-text-dim hover:text-cyber-cyan transition-colors px-2 py-1 rounded"
              >
                <i className={copied ? 'ri-check-line text-cyber-green' : 'ri-file-copy-line'} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="p-4">
              <code className="text-sm font-mono text-cyber-green break-all">{result}</code>
            </div>
          </div>
        )}

        {/* Usage hint */}
        <div className="mt-8 cyber-card p-5">
          <h4 className="text-white font-semibold mb-3">How to Use This Filter</h4>
          <ol className="space-y-2 text-sm text-cyber-text-muted">
            <li className="flex gap-2">
              <span className="text-cyber-cyan font-mono">1.</span>
              <span>Copy the generated filter string above.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-cyber-cyan font-mono">2.</span>
              <span>In Wireshark, paste it into the display filter bar at the top of the packet list.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-cyber-cyan font-mono">3.</span>
              <span>Or use it with tshark: <InlineCode>tshark -r capture.pcap -Y "your_filter_here"</InlineCode></span>
            </li>
          </ol>
        </div>
      </div>
  );
}