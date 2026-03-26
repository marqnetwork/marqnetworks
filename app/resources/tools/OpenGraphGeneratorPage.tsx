import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { Copy, Check } from 'lucide-react';
export function OpenGraphGeneratorPage() {
  const [title, setTitle] = useState(''); const [desc, setDesc] = useState(''); const [url, setUrl] = useState(''); const [image, setImage] = useState(''); const [siteName, setSiteName] = useState(''); const [type, setType] = useState('website'); const [twitterCard, setTwitterCard] = useState('summary_large_image'); const [copied, setCopied] = useState(false);
  const tags = `<!-- Open Graph / Facebook -->\n<meta property="og:type" content="${type}" />\n<meta property="og:url" content="${url}" />\n<meta property="og:title" content="${title}" />\n<meta property="og:description" content="${desc}" />\n${image ? `<meta property="og:image" content="${image}" />\n` : ''}${siteName ? `<meta property="og:site_name" content="${siteName}" />\n` : ''}\n<!-- Twitter -->\n<meta property="twitter:card" content="${twitterCard}" />\n<meta property="twitter:url" content="${url}" />\n<meta property="twitter:title" content="${title}" />\n<meta property="twitter:description" content="${desc}" />\n${image ? `<meta property="twitter:image" content="${image}" />` : ''}`;
  const copy = () => { navigator.clipboard.writeText(tags); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <ToolPageLayout toolId="open-graph-generator">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 space-y-4">
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Page Title *</label><input value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30" placeholder="My Awesome Page" /></div>
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Description</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 resize-none placeholder-white/30" placeholder="A brief description of your page..." /></div>
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">URL</label><input value={url} onChange={e => setUrl(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30" placeholder="https://example.com/page" /></div>
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Image URL</label><input value={image} onChange={e => setImage(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30" placeholder="https://example.com/image.jpg" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">OG Type</label><select value={type} onChange={e => setType(e.target.value)} className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none [&>option]:bg-[#1a1a1a]" style={{ colorScheme: 'dark' }}><option value="website">Website</option><option value="article">Article</option><option value="product">Product</option><option value="profile">Profile</option></select></div>
            <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Twitter Card</label><select value={twitterCard} onChange={e => setTwitterCard(e.target.value)} className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none [&>option]:bg-[#1a1a1a]" style={{ colorScheme: 'dark' }}><option value="summary_large_image">Summary Large Image</option><option value="summary">Summary</option></select></div>
          </div>
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Site Name</label><input value={siteName} onChange={e => setSiteName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30" placeholder="My Website" /></div>
        </div>
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-white/50 uppercase tracking-wider">Generated Meta Tags</label>
            <button onClick={copy} className="flex items-center gap-1 text-xs text-white/40 hover:text-[#39FF14]">{copied ? <Check className="w-3 h-3 text-[#39FF14]" /> : <Copy className="w-3 h-3" />}{copied ? 'Copied!' : 'Copy'}</button>
          </div>
          <pre className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/5 text-[#39FF14] text-xs font-mono whitespace-pre-wrap">{tags}</pre>
          {title && (
            <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Preview</p>
              <div className="bg-[#0a0a0a] rounded-lg border border-white/10 overflow-hidden">{image && <div className="h-32 bg-white/5 flex items-center justify-center text-xs text-white/20">Image Preview</div>}<div className="p-3"><p className="text-xs text-blue-400">{url || 'example.com'}</p><p className="text-sm font-bold text-white mt-0.5">{title}</p><p className="text-xs text-white/40 mt-1 line-clamp-2">{desc}</p></div></div>
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
