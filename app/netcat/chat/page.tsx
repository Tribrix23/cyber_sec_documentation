'use client'

import { useEffect } from 'react';
import DocHeading from '@/components/base/DocHeading';
import Callout from '@/components/base/Callout';
import InlineCode from '@/components/base/InlineCode';
import CodeBlock from '@/components/base/Codeblock';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function NetcatChatPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-medium font-mono mb-4">
          <i className="ri-chat-3-line" />
          Netcat Section 5 of 14
        </div>
        <DocHeading level={1}>Chat Application</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3 text-lg">
          Netcat can create a simple, lightweight chat server for two or more clients to communicate in real-time. This is useful for private communication during penetration tests, for red team operations, or as a proof-of-concept for understanding TCP socket programming.
        </p>
      </motion.div>

      {/* How it works */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>How Netcat Chat Works</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          One machine listens on a port (server). Other machines connect to that port (clients). All connected clients receive any data sent by any other client. Netcat treats stdin as input and sends everything over the network, making a functional multi-user chat with zero code.
        </p>

        <div className="mt-6 cyber-card p-5">
          <h3 className="text-sm font-semibold text-white mb-3">The Simple Chat Loop</h3>
          <ol className="space-y-2 text-sm text-cyber-text">
            <li className="flex items-start gap-2">
              <span className="text-cyber-red font-mono mt-0.5">1.</span>
              <span><strong className="text-white">Listener:</strong> <InlineCode>nc -l -p 4444</InlineCode> — Opens a TCP server on port 4444.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyber-red font-mono mt-0.5">2.</span>
              <span><strong className="text-white">Client:</strong> <InlineCode>nc 10.0.0.1 4444</InlineCode> — Connects to the listener.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyber-red font-mono mt-0.5">3.</span>
              <span><strong className="text-white">Chat:</strong> Both sides type messages and press Enter. Everything typed is sent to the other side.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyber-red font-mono mt-0.5">4.</span>
              <span><strong className="text-white">Disconnect:</strong> Ctrl+C or Ctrl+D closes the connection.</span>
            </li>
          </ol>
        </div>
      </motion.section>

      {/* Examples */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Chat Examples</DocHeading>
        <div className="mt-6 space-y-4">
          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Two-Person Chat (Listener)</h3>
            <CodeBlock code="nc -l -p 4444" />
            <p className="text-xs text-cyber-text mt-3">
              Listens on port 4444. The server waits for a client to connect. Once connected, anything typed is sent to the client and vice versa.
            </p>
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Two-Person Chat (Client)</h3>
            <CodeBlock code="nc 10.0.0.1 4444" />
            <p className="text-xs text-cyber-text mt-3">
              Connects to the listening netcat instance at 10.0.0.1:4444. Start typing after connection.
            </p>
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Multi-Client Chat Server</h3>
            <CodeBlock code={`# Terminal 1 — Listener
nc -l -p 4444

# Terminal 2 — Client (second user)
nc localhost 4444

# Terminal 3 — Client (third user)
nc localhost 4444`} />
            <p className="text-xs text-cyber-text mt-3">
              In this simple netcat chat, all clients connect to the same listener. Note that traditional netcat only supports two endpoints at a time; for a true multi-user chat, consider using <InlineCode>socat</InlineCode> or <InlineCode>ncat --multicaster</InlineCode>. However, basic netcat can serve as a simple two-person chat or file transfer channel.
            </p>
          </div>

          <div className="cyber-card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Chat with Optional Port Binding</h3>
            <CodeBlock code={`# On machine A (listener)
nc -l -p 4444 > chatlog.txt

# On machine B (client)
nc 10.0.0.2 4444 2>&1 | tee chatlog.txt`} />
            <p className="text-xs text-cyber-text mt-3">
              Redirects output to a file to keep a transcript of the conversation. The client uses <InlineCode>tee</InlineCode> to both display and save incoming messages. Useful for logging evidence in a red team scenario.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Limitations */}
      <motion.section className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <DocHeading level={2}>Limitations</DocHeading>
        <p className="text-cyber-text leading-relaxed mt-3">
          Basic netcat chat is simple but not production-ready:
        </p>
        <ul className="mt-3 space-y-2 text-sm text-cyber-text list-disc list-inside">
          <li>No authentication — anyone who connects can chat.</li>
          <li>No encryption — all messages are plain text. Use <InlineCode>nc --ssl</InlineCode> or <InlineCode>ncat --ssl</InlineCode> if available.</li>
          <li>No rooms or channels — only one conversation per port.</li>
          <li>Classic netcat handles one client at a time per listener. For concurrent clients, use <InlineCode>ncat --keep-open</InlineCode> or a more robust chat server.</li>
        </ul>
      </motion.section>

      {/* Tips */}
      <motion.section className="mt-12 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Callout type="tip">
          For encrypted chat, use <InlineCode>ncat --ssl -l -p 4444</InlineCode> on the listener and <InlineCode>ncat --ssl 10.0.0.1 4444</InlineCode> on the client if both sides support SSL.
        </Callout>

        <div className="mt-8 flex gap-3">
          <a href="/netcat/remote-shell" className="px-5 py-2.5 rounded-lg bg-cyber-amber text-black text-sm font-semibold hover:bg-cyber-amber/80 transition-all whitespace-nowrap">
            Next: Remote Shell <i className="ri-arrow-right-line ml-1" />
          </a>
          <a href="/netcat/banner-grabbing" className="px-5 py-2.5 rounded-lg border border-cyber-border text-sm font-semibold text-cyber-text hover:border-cyber-amber hover:text-cyber-amber transition-all whitespace-nowrap">
            <i className="ri-arrow-left-line mr-1" /> Back
          </a>
        </div>
      </motion.section>
    </div>
  );
}
