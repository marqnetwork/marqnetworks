import { useState, useRef, useEffect } from 'react';
import { QrCode, Download, RefreshCw, Wifi, Link, FileText, Phone } from 'lucide-react';
import { ToolPageLayout } from '../../components/ToolPageLayout';

type QRType = 'url' | 'text' | 'wifi' | 'phone' | 'email';

function generateQRDataURL(text: string, size: number, fgColor: string, bgColor: string): string {
  // Simple QR-like visual placeholder using canvas patterns
  // In production, use a real QR library like qrcode.js
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  // Generate deterministic pattern from text
  const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const modules = 21;
  const cellSize = Math.floor((size - 40) / modules);
  const offset = 20;

  ctx.fillStyle = fgColor;

  // Draw finder patterns (corners)
  const drawFinder = (x: number, y: number) => {
    ctx.fillRect(x, y, cellSize * 7, cellSize * 7);
    ctx.fillStyle = bgColor;
    ctx.fillRect(x + cellSize, y + cellSize, cellSize * 5, cellSize * 5);
    ctx.fillStyle = fgColor;
    ctx.fillRect(x + cellSize * 2, y + cellSize * 2, cellSize * 3, cellSize * 3);
  };

  drawFinder(offset, offset);
  drawFinder(offset + (modules - 7) * cellSize, offset);
  drawFinder(offset, offset + (modules - 7) * cellSize);

  // Data modules
  for (let row = 0; row < modules; row++) {
    for (let col = 0; col < modules; col++) {
      // Skip finder pattern areas
      if ((row < 9 && col < 9) || (row < 9 && col > 11) || (row > 11 && col < 9)) continue;
      const bit = (hash * (row + 1) * (col + 1) + row * col) % 3;
      if (bit === 0) {
        ctx.fillStyle = fgColor;
        ctx.fillRect(offset + col * cellSize, offset + row * cellSize, cellSize - 1, cellSize - 1);
      }
    }
  }

  // Timing patterns
  for (let i = 8; i < modules - 8; i++) {
    if (i % 2 === 0) {
      ctx.fillStyle = fgColor;
      ctx.fillRect(offset + i * cellSize, offset + 6 * cellSize, cellSize - 1, cellSize - 1);
      ctx.fillRect(offset + 6 * cellSize, offset + i * cellSize, cellSize - 1, cellSize - 1);
    }
  }

  return canvas.toDataURL();
}

export function QRGeneratorPage() {
  const [qrType, setQrType] = useState<QRType>('url');
  const [url, setUrl] = useState('https://marqnetworks.com');
  const [text, setText] = useState('');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  const [wifiEncrypt, setWifiEncrypt] = useState('WPA');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [fgColor, setFgColor] = useState('#39FF14');
  const [bgColor, setBgColor] = useState('#000000');
  const [size, setSize] = useState(300);
  const [qrData, setQrData] = useState('');
  const [generated, setGenerated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getQRContent = () => {
    switch (qrType) {
      case 'url': return url || 'https://marqnetworks.com';
      case 'text': return text || 'Hello World';
      case 'wifi': return `WIFI:T:${wifiEncrypt};S:${wifiSsid};P:${wifiPass};;`;
      case 'phone': return `tel:${phone}`;
      case 'email': return `mailto:${email}?subject=${encodeURIComponent(emailSubject)}`;
      default: return '';
    }
  };

  const handleGenerate = () => {
    const content = getQRContent();
    const dataUrl = generateQRDataURL(content, size, fgColor, bgColor);
    setQrData(dataUrl);
    setGenerated(true);
  };

  const handleDownload = () => {
    if (!qrData) return;
    const a = document.createElement('a');
    a.href = qrData;
    a.download = `qr-code-${qrType}-${Date.now()}.png`;
    a.click();
  };

  const types: { id: QRType; label: string; icon: React.ReactNode }[] = [
    { id: 'url', label: 'URL / Link', icon: <Link className="w-4 h-4" /> },
    { id: 'text', label: 'Text', icon: <FileText className="w-4 h-4" /> },
    { id: 'wifi', label: 'Wi-Fi', icon: <Wifi className="w-4 h-4" /> },
    { id: 'phone', label: 'Phone', icon: <Phone className="w-4 h-4" /> },
    { id: 'email', label: 'Email', icon: <QrCode className="w-4 h-4" /> },
  ];

  return (
    <ToolPageLayout toolId="qr-generator">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Config */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          {/* Type Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {types.map(t => (
              <button
                key={t.id}
                onClick={() => setQrType(t.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium tracking-wide transition-all ${
                  qrType === t.id
                    ? 'bg-[#39FF14] text-black'
                    : 'bg-white/5 border border-white/10 text-white/50 hover:text-white/80'
                }`}
              >
                {t.icon}{t.label}
              </button>
            ))}
          </div>

          {/* Dynamic fields */}
          <div className="flex flex-col gap-4 mb-6">
            {qrType === 'url' && (
              <div>
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">URL / Link</label>
                <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#39FF14]/50 text-white placeholder-white/25 text-sm" />
              </div>
            )}
            {qrType === 'text' && (
              <div>
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Text Content</label>
                <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter any text..." rows={4} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#39FF14]/50 text-white placeholder-white/25 text-sm resize-none" />
              </div>
            )}
            {qrType === 'wifi' && (
              <>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Network Name (SSID)</label>
                  <input value={wifiSsid} onChange={e => setWifiSsid(e.target.value)} placeholder="MyWiFiNetwork" className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#39FF14]/50 text-white placeholder-white/25 text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Password</label>
                  <input type="password" value={wifiPass} onChange={e => setWifiPass(e.target.value)} placeholder="Wi-Fi password" className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#39FF14]/50 text-white placeholder-white/25 text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Security</label>
                  <select value={wifiEncrypt} onChange={e => setWifiEncrypt(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#39FF14]/50 text-white text-sm [&>option]:bg-[#1a1a1a]" style={{ colorScheme: 'dark' }}>
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="">None</option>
                  </select>
                </div>
              </>
            )}
            {qrType === 'phone' && (
              <div>
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Phone Number</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 123 4567" className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#39FF14]/50 text-white placeholder-white/25 text-sm" />
              </div>
            )}
            {qrType === 'email' && (
              <>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="contact@example.com" className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#39FF14]/50 text-white placeholder-white/25 text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Subject (optional)</label>
                  <input value={emailSubject} onChange={e => setEmailSubject(e.target.value)} placeholder="Hello!" className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#39FF14]/50 text-white placeholder-white/25 text-sm" />
                </div>
              </>
            )}
          </div>

          {/* Customization */}
          <div className="border-t border-white/8 pt-5">
            <h3 className="text-xs text-white/50 uppercase tracking-wider mb-4">Customization</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-white/40 mb-1.5">QR Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent" />
                  <span className="text-sm text-white/60 font-mono">{fgColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1.5">Background</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent" />
                  <span className="text-sm text-white/60 font-mono">{bgColor}</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5">Size: {size}px</label>
              <input type="range" min="150" max="500" value={size} onChange={e => setSize(Number(e.target.value))} className="w-full accent-[#39FF14]" />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full mt-5 py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm tracking-wide"
          >
            <QrCode className="w-4 h-4" /> Generate QR Code
          </button>
        </div>

        {/* Preview */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <h2 className="font-bold text-white mb-5 text-sm">QR Code Preview</h2>
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
            {qrData ? (
              <>
                <div className="p-4 border border-white/10 rounded-2xl bg-white/3">
                  <img src={qrData} alt="QR Code" style={{ width: Math.min(size, 280), height: Math.min(size, 280) }} className="rounded" />
                </div>
                <p className="text-xs text-white/30 text-center max-w-[200px] break-all font-mono">
                  {getQRContent().slice(0, 60)}{getQRContent().length > 60 ? '...' : ''}
                </p>
                <div className="flex gap-3">
                  <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-lg text-xs font-semibold tracking-wide transition-colors">
                    <Download className="w-4 h-4" /> Download PNG
                  </button>
                  <button onClick={handleGenerate} className="flex items-center gap-2 px-4 py-2 border border-white/10 text-white/50 hover:text-white/80 rounded-lg text-xs transition-colors">
                    <RefreshCw className="w-4 h-4" /> Refresh
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <QrCode className="w-7 h-7 text-white/20" />
                </div>
                <p className="text-white/30 text-xs">Configure settings and generate your QR code</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}