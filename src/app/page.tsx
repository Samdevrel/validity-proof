'use client';

import { useState } from 'react';

interface Proof {
  id: string;
  type: 'validity' | 'privacy' | 'zk-rollup' | 'validium';
  claim: string;
  prover: string;
  verifier: string;
  proofSize: string;
  verificationTime: string;
  valid: boolean;
}

interface RollupComparison {
  type: string;
  dataAvailability: string;
  privacy: string;
  validityProof: string;
  cost: string;
}

const proofs: Proof[] = [
  {
    id: 'PROOF-001',
    type: 'zk-rollup',
    claim: 'State root S2 = F(S1, transactions)',
    prover: '0x7a...9f2e',
    verifier: '0x3c...1d4a',
    proofSize: '2.1 MB',
    verificationTime: '45ms',
    valid: true,
  },
  {
    id: 'PROOF-002',
    type: 'validium',
    claim: 'Smart contract on-chain verification',
    prover: '0x5f...7a8b',
    verifier: '0x2a...9c1d',
    proofSize: '1.8 MB',
    verificationTime: '38ms',
    valid: true,
  },
  {
    id: 'PROOF-003',
    type: 'privacy',
    claim: 'Private transaction data, public result',
    prover: '0x7a...9f2e',
    verifier: '0x3c...1d4a',
    proofSize: '1.2 MB',
    verificationTime: '52ms',
    valid: true,
  },
  {
    id: 'PROOF-004',
    type: 'validity',
    claim: 'Off-chain computation with on-chain proof',
    prover: '0x5f...7a8b',
    verifier: '0x2a...9c1d',
    proofSize: '2.5 MB',
    verificationTime: '67ms',
    valid: false,
  },
];

const comparisons: RollupComparison[] = [
  {
    type: 'zk-Rollup',
    dataAvailability: 'On-chain batch',
    privacy: 'Full (ZK proof)',
    validityProof: 'Optional (for fraud)',
    cost: 'High (proof gen)',
  },
  {
    type: 'Validium',
    dataAvailability: 'Off-chain (data availability committee)',
    privacy: 'Full (ZK proof)',
    validityProof: 'Required (data commitment)',
    cost: 'Medium (data committee)',
  },
  {
    type: 'Optimistic Rollup',
    dataAvailability: 'On-chain batch',
    privacy: 'None',
    validityProof: 'None (fraud proofs)',
    cost: 'Low (verification)',
  },
];

export default function Home() {
  const [selectedProof, setSelectedProof] = useState<Proof | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateProof = async () => {
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsGenerating(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b-4 border-cyan-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">Validity Proof Simulator</h1>
          <p className="text-gray-400 mt-2">Off-chain computation with on-chain validity verification</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border-4 border-cyan-400 p-4 text-center">
            <div className="text-3xl font-black text-cyan-400">4</div>
            <div className="text-sm text-gray-400">Proof Types</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">48ms</div>
            <div className="text-sm text-gray-400">Avg Verification</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black text-green-400">3.1 MB</div>
            <div className="text-sm text-gray-400">Avg Proof Size</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">100%</div>
            <div className="text-sm text-gray-400">Validity</div>
          </div>
        </section>

        {/* Generate Button */}
        <button
          onClick={generateProof}
          disabled={isGenerating}
          className="w-full py-4 bg-cyan-500 text-white font-bold border-4 border-cyan-400 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
        >
          {isGenerating ? 'Generating Validity Proof...' : 'Generate Validity Proof'}
        </button>

        {/* Proofs */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Proof Examples</h2>
          <div className="space-y-4">
            {proofs.map((proof) => (
              <div
                key={proof.id}
                onClick={() => setSelectedProof(proof)}
                className={`p-4 border-4 cursor-pointer transition-all ${
                  selectedProof?.id === proof.id
                    ? 'bg-cyan-900/30 border-cyan-400'
                    : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs text-gray-400">{proof.id}</span>
                    <h3 className="font-bold text-cyan-400">{proof.type.toUpperCase()}</h3>
                  </div>
                  <span className={`px-2 py-1 text-xs font-bold ${
                    proof.valid ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
                  }`}>
                    {proof.valid ? 'VALID' : 'INVALID'}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{proof.claim}</p>
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-400">
                  <div>
                    <div className="text-gray-500">Prover</div>
                    <div className="font-mono">{proof.prover}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Proof Size</div>
                    <div className="font-bold">{proof.proofSize}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Verification</div>
                    <div className="font-bold">{proof.verificationTime}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Proof */}
        {selectedProof && (
          <section className="bg-gray-900 border-4 border-cyan-400 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-black text-cyan-400">{selectedProof.type.toUpperCase()} Proof</h2>
                <p className="text-sm text-gray-400">{selectedProof.id}</p>
              </div>
              <button
                onClick={() => setSelectedProof(null)}
                className="px-4 py-2 bg-gray-700 text-white font-bold border-2 border-gray-600 hover:bg-gray-600"
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-800 border border-gray-700">
                <div className="text-sm text-gray-400 mb-1">Claim</div>
                <p className="text-white font-mono">{selectedProof.claim}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-gray-800 border border-gray-700">
                  <div className="text-sm text-gray-400">Prover</div>
                  <div className="font-mono text-sm">{selectedProof.prover}</div>
                </div>
                <div className="p-3 bg-gray-800 border border-gray-700">
                  <div className="text-sm text-gray-400">Proof Size</div>
                  <div className="font-bold">{selectedProof.proofSize}</div>
                </div>
                <div className="p-3 bg-gray-800 border border-gray-700">
                  <div className="text-sm text-gray-400">Verification</div>
                  <div className="font-bold text-cyan-400">{selectedProof.verificationTime}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Comparison Table */}
        <section className="bg-gray-900 border-4 border-purple-400 p-6">
          <h2 className="text-xl font-black text-purple-400 mb-4">Validity Proofs: zk-Rollup vs Validium</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="text-left py-3">Feature</th>
                  <th className="text-left py-3">zk-Rollup</th>
                  <th className="text-left py-3">Validium</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-3 font-bold">Data Availability</td>
                  <td className="py-3">On-chain batch</td>
                  <td className="py-3">Off-chain (DAC)</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 font-bold">Privacy</td>
                  <td className="py-3">Full (ZK proof)</td>
                  <td className="py-3">Full (ZK proof)</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 font-bold">Validity Proof</td>
                  <td className="py-3">Optional</td>
                  <td className="py-3">Required</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 font-bold">Cost</td>
                  <td className="py-3 text-red-400">High</td>
                  <td className="py-3 text-yellow-400">Medium</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">How Validity Proofs Work</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="font-bold text-cyan-400 mb-2">Off-Chain Computation</h3>
              <p className="text-xs text-gray-400">Compute off-chain, keep private</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="font-bold text-purple-400 mb-2">Data Availability</h3>
              <p className="text-xs text-gray-400">On-chain batch or committee</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="font-bold text-green-400 mb-2">Generate Proof</h3>
              <p className="text-xs text-gray-400">Prove correctness succinctly</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">4️⃣</div>
              <h3 className="font-bold text-yellow-400 mb-2">On-Chain Verification</h3>
              <p className="text-xs text-gray-400">Verifier checks proof validity</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-800">
          <p>
            Built by <a href="https://x.com/samdevrel" className="text-cyan-400 hover:underline">@samdevrel</a>
          <button
            onClick={() => window.location.href = '/docs/overview'}
            className="w-full py-4 bg-purple-500 text-white font-bold border-4 border-purple-400 hover:bg-purple-400 mb-4"
          >
            {buttonText}
          </button>
                    </p>
        </footer>
      </div>
    </main>
  );
}
