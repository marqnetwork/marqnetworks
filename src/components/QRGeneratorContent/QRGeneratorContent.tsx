
"use client";
import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import JSZip from 'jszip';
import './QRGeneratorContent.css';

// QR Code Types
const QR_TYPES = {
  URL: 'url',
  TEXT: 'text',
  EMAIL: 'email',
  PHONE: 'phone',
  SMS: 'sms',
  WIFI: 'wifi',
  VCARD: 'vcard',
  LOCATION: 'location',
  EVENT: 'event',
  CRYPTO: 'crypto'
};

// Error Correction Levels
const ERROR_LEVELS = {
  L: 'L', // Low (~7%)
  M: 'M', // Medium (~15%)
  Q: 'Q', // Quartile (~25%)
  H: 'H'  // High (~30%)
};

// QR Code Templates
const QR_TEMPLATES = {
  BUSINESS: { color: '#1a1a1a', bgColor: '#ffffff', size: 300 },
  SOCIAL: { color: '#4267B2', bgColor: '#ffffff', size: 250 },
  MARKETING: { color: '#ff6b6b', bgColor: '#ffffff', size: 400 },
  TECH: { color: '#39ff14', bgColor: '#000000', size: 350 },
  MINIMAL: { color: '#000000', bgColor: '#ffffff', size: 200 }
};

// Analytics and Tracking
const ANALYTICS_EVENTS = {
  QR_GENERATED: 'qr_generated',
  QR_DOWNLOADED: 'qr_downloaded',
  QR_SCANNED: 'qr_scanned',
  TEMPLATE_USED: 'template_used',
  BATCH_GENERATED: 'batch_generated'
};

// Social Media Platforms
const SOCIAL_PLATFORMS = {
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
  WHATSAPP: 'whatsapp',
  TELEGRAM: 'telegram'
};

// QR Code Frames
const QR_FRAMES = {
  NONE: 'none',
  ROUNDED: 'rounded',
  SQUARE: 'square',
  CIRCLE: 'circle',
  MODERN: 'modern'
};

const QRGeneratorContent = () => {
  // Basic QR settings
  const [qrType, setQrType] = useState(QR_TYPES.URL);
  const [qrData, setQrData] = useState('https://marqnetworks.com');
  const [qrSize, setQrSize] = useState(300);
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [errorLevel, setErrorLevel] = useState(ERROR_LEVELS.M);
  const [margin, setMargin] = useState(1);
  
  // Advanced customization
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoSize, setLogoSize] = useState(20);
  const [borderRadius, setBorderRadius] = useState(0);
  const [pattern, setPattern] = useState('square');
  
  // Form data for different QR types
  const [urlData, setUrlData] = useState('https://marqnetworks.com');
  const [textData, setTextData] = useState('');
  const [emailData, setEmailData] = useState({ email: '', subject: '', body: '' });
  const [phoneData, setPhoneData] = useState('');
  const [smsData, setSmsData] = useState({ phone: '', message: '' });
  const [wifiData, setWifiData] = useState({ ssid: '', password: '', security: 'WPA', hidden: false });
  const [vcardData, setVcardData] = useState({ 
    firstName: '', lastName: '', organization: '', phone: '', email: '', url: '', address: '' 
  });
  const [locationData, setLocationData] = useState({ latitude: '', longitude: '', query: '' });
  const [eventData, setEventData] = useState({ 
    title: '', location: '', startDate: '', endDate: '', description: '' 
  });
  const [cryptoData, setCryptoData] = useState({ address: '', amount: '', label: '', message: '' });
  
  // Generation and export
  const [qrImage, setQrImage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [exportFormat, setExportFormat] = useState('png');
  const [qrHistory, setQrHistory] = useState<any[]>([]);
  const [showBatchGenerator, setShowBatchGenerator] = useState(false);
  const [batchData, setBatchData] = useState('');
  
  // Analytics and Tracking
  const [qrAnalytics, setQrAnalytics] = useState<any[]>([]);
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [geoTracking, setGeoTracking] = useState(false);
  const [qrId, setQrId] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  // Dynamic QR and Security
  const [isDynamic, setIsDynamic] = useState(false);
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [qrPassword, setQrPassword] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [maxScans, setMaxScans] = useState(0);
  
  // Advanced Design
  const [qrFrame, setQrFrame] = useState(QR_FRAMES.NONE);
  const [gradientEnabled, setGradientEnabled] = useState(false);
  const [gradientStart, setGradientStart] = useState('#000000');
  const [gradientEnd, setGradientEnd] = useState('#333333');
  const [shadowEnabled, setShadowEnabled] = useState(false);
  const [shadowColor, setShadowColor] = useState('#00000050');
  
  // Social and Sharing
  const [showSocialShare, setShowSocialShare] = useState(false);
  const [shareMessage, setShareMessage] = useState('Check out this QR code!');
  
  // Campaign Management
  const [campaignName, setCampaignName] = useState('');
  const [campaignTags, setCampaignTags] = useState<string[]>([]);
  const [showCampaigns, setShowCampaigns] = useState(false);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  
  // Validation and Testing
  const [validationResult, setValidationResult] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  // Generate QR data based on type
  const generateQRData = () => {
    let originalData = '';
    
    switch (qrType) {
      case QR_TYPES.URL:
        originalData = urlData;
        break;
      
      case QR_TYPES.TEXT:
        originalData = textData;
        break;
      
      case QR_TYPES.EMAIL:
        const emailSubject = emailData.subject ? `?subject=${encodeURIComponent(emailData.subject)}` : '';
        const emailBody = emailData.body ? `${emailData.subject ? '&' : '?'}body=${encodeURIComponent(emailData.body)}` : '';
        originalData = `mailto:${emailData.email}${emailSubject}${emailBody}`;
        break;
      
      case QR_TYPES.PHONE:
        originalData = `tel:${phoneData}`;
        break;
      
      case QR_TYPES.SMS:
        originalData = `sms:${smsData.phone}${smsData.message ? `?body=${encodeURIComponent(smsData.message)}` : ''}`;
        break;
      
      case QR_TYPES.WIFI:
        const hidden = wifiData.hidden ? 'H:true;' : '';
        originalData = `WIFI:T:${wifiData.security};S:${wifiData.ssid};P:${wifiData.password};${hidden};`;
        break;
      
      case QR_TYPES.VCARD:
        originalData = `BEGIN:VCARD
VERSION:3.0
FN:${vcardData.firstName} ${vcardData.lastName}
ORG:${vcardData.organization}
TEL:${vcardData.phone}
EMAIL:${vcardData.email}
URL:${vcardData.url}
ADR:;;${vcardData.address};;;;
END:VCARD`;
        break;
      
      case QR_TYPES.LOCATION:
        if (locationData.latitude && locationData.longitude) {
          originalData = `geo:${locationData.latitude},${locationData.longitude}${locationData.query ? `?q=${encodeURIComponent(locationData.query)}` : ''}`;
        } else {
          originalData = locationData.query ? `geo:0,0?q=${encodeURIComponent(locationData.query)}` : '';
        }
        break;
      
      case QR_TYPES.EVENT:
        const formatDate = (date: string) => date.replace(/[-:]/g, '').replace('T', '') + 'Z';
        originalData = `BEGIN:VEVENT
SUMMARY:${eventData.title}
LOCATION:${eventData.location}
DTSTART:${eventData.startDate ? formatDate(eventData.startDate) : ''}
DTEND:${eventData.endDate ? formatDate(eventData.endDate) : ''}
DESCRIPTION:${eventData.description}
END:VEVENT`;
        break;
      
      case QR_TYPES.CRYPTO:
        let cryptoUrl = `bitcoin:${cryptoData.address}`;
        const params = [];
        if (cryptoData.amount) params.push(`amount=${cryptoData.amount}`);
        if (cryptoData.label) params.push(`label=${encodeURIComponent(cryptoData.label)}`);
        if (cryptoData.message) params.push(`message=${encodeURIComponent(cryptoData.message)}`);
        if (params.length > 0) cryptoUrl += `?${params.join('&')}`;
        originalData = cryptoUrl;
        break;
      
      default:
        originalData = qrData;
        break;
    }

    // Apply security and dynamic features
    return generateSecureData(originalData);
  };

  // Security and Dynamic QR Helper Functions
  const isExpired = () => {
    if (!expirationDate) return false;
    return new Date() > new Date(expirationDate);
  };

  const generateDynamicUrl = (originalData: string) => {
    // In a real implementation, this would point to your backend service
    // For demo purposes, we'll create a URL with encoded parameters
    const baseUrl = 'https://your-domain.com/qr-redirect';
    const params = new URLSearchParams({
      id: qrId,
      data: btoa(originalData), // Base64 encode the original data
      password: passwordProtected ? 'true' : 'false',
      expires: expirationDate || ''
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const generateSecureData = (originalData: string) => {
    // If expired, return expiration message
    if (isExpired()) {
      return 'This QR code has expired and is no longer valid.';
    }

    // If dynamic QR is enabled, return redirect URL
    if (isDynamic) {
      return generateDynamicUrl(originalData);
    }

    // If password protected but not dynamic, create a password-protected URL
    if (passwordProtected) {
      const baseUrl = 'https://your-domain.com/qr-secure';
      const params = new URLSearchParams({
        id: qrId,
        data: btoa(originalData),
        expires: expirationDate || ''
      });
      return `${baseUrl}?${params.toString()}`;
    }

    // Return original data if no security features are enabled
    return originalData;
  };

  // Apply template
  const applyTemplate = (templateName: string) => {
    const template = QR_TEMPLATES[templateName as keyof typeof QR_TEMPLATES];
    if (template) {
      setQrColor(template.color);
      setBgColor(template.bgColor);
      setQrSize(template.size);
    }
  };

  // Handle logo upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setLogoFile(file);
    }
  };

  // Generate QR code
  const generateQRCode = async () => {
    const data = generateQRData();
    if (!data.trim()) {
      setError('Please enter data for the QR code');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      // Generate unique QR ID for tracking
      const newQrId = generateQRId();
      setQrId(newQrId);

      // Generate QR code to canvas for advanced customization
      const canvas = canvasRef.current;
      if (!canvas) return;

      await QRCode.toCanvas(canvas, data, {
        width: qrSize,
        margin: margin,
        color: {
          dark: gradientEnabled ? '#000000' : qrColor,
          light: bgColor
        },
        errorCorrectionLevel: errorLevel
      });

      // Apply advanced design features
      if (gradientEnabled) {
        applyGradient(canvas);
      }
      
      if (qrFrame !== QR_FRAMES.NONE) {
        applyFrame(canvas);
      }

      // Add logo if provided
      if (logoFile && logoRef.current) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const logoSizePixels = (qrSize * logoSize) / 100;
          const x = (qrSize - logoSizePixels) / 2;
          const y = (qrSize - logoSizePixels) / 2;
          
          // Add white background for logo
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(x - 5, y - 5, logoSizePixels + 10, logoSizePixels + 10);
          
          ctx.drawImage(logoRef.current, x, y, logoSizePixels, logoSizePixels);
        }
      }

      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL('image/png');
      setQrImage(dataUrl);
      
      // Track analytics
      trackEvent(ANALYTICS_EVENTS.QR_GENERATED, {
        qrId: newQrId,
        dataLength: data.length,
        hasLogo: !!logoFile,
        hasGradient: gradientEnabled,
        frame: qrFrame
      });

      // Add to history
      const historyItem = {
        id: newQrId,
        type: qrType,
        data: data,
        timestamp: new Date().toISOString(),
        settings: {
          size: qrSize,
          color: qrColor,
          bgColor: bgColor,
          errorLevel: errorLevel,
          pattern: pattern,
          gradient: gradientEnabled,
          frame: qrFrame
        }
      };
      setQrHistory(prev => [historyItem, ...prev.slice(0, 9)]); // Keep last 10
      
    } catch (err) {
      console.error('Error generating QR code:', err);
      setError('Failed to generate QR code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Download QR code
  const downloadQRCode = async () => {
    console.log('Download button clicked');
    console.log('qrImage exists:', !!qrImage);
    
    if (!qrImage) {
      console.log('No qrImage, returning early');
      return;
    }

    try {
      const canvas = canvasRef.current;
      console.log('Canvas ref:', canvas);
      console.log('Canvas dimensions:', canvas ? `${canvas.width}x${canvas.height}` : 'N/A');
      
      if (!canvas) {
        console.log('No canvas, returning early');
        return;
      }

      let dataUrl = '';
      const filename = `qr-code-${Date.now()}`;
      console.log('Export format:', exportFormat);

      if (exportFormat === 'PNG') {
        dataUrl = canvas.toDataURL('image/png');
        console.log('PNG dataUrl length:', dataUrl.length);
      } else if (exportFormat === 'JPG') {
        // Create a new canvas with white background for JPG
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          // Fill with white background
          tempCtx.fillStyle = '#ffffff';
          tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
          // Draw the QR code on top
          tempCtx.drawImage(canvas, 0, 0);
          dataUrl = tempCanvas.toDataURL('image/jpeg', 0.9);
          console.log('JPG dataUrl length:', dataUrl.length);
        }
      } else if (exportFormat === 'SVG') {
        // For SVG, generate a basic version since canvas can't export to SVG
        const data = generateQRData();
        const svgString = await QRCode.toString(data, {
          type: 'svg',
          width: qrSize,
          margin: margin,
          color: {
            dark: qrColor,
            light: bgColor
          },
          errorCorrectionLevel: errorLevel
        });
        dataUrl = 'data:image/svg+xml;base64,' + btoa(svgString);
        console.log('SVG dataUrl length:', dataUrl.length);
      }

      console.log('Final dataUrl exists:', !!dataUrl);
      
      // Fallback to qrImage if canvas approach failed
      if (!dataUrl && qrImage) {
        console.log('Using fallback qrImage for download');
        dataUrl = qrImage;
      }
      
      if (dataUrl) {
        try {
          // Convert data URL to blob for better browser compatibility
          const response = await fetch(dataUrl);
          const blob = await response.blob();
          
          // Create object URL
          const objectUrl = URL.createObjectURL(blob);
          
          const link = document.createElement('a');
          link.href = objectUrl;
          link.download = `${filename}.${exportFormat.toLowerCase()}`;
          console.log('Download filename:', link.download);
          
          // Ensure link is added to DOM for some browsers
          link.style.display = 'none';
          document.body.appendChild(link);
          
          // Trigger download
          link.click();
          
          // Clean up
          document.body.removeChild(link);
          URL.revokeObjectURL(objectUrl);
          
          console.log('Download triggered successfully');
        } catch (blobError) {
          console.log('Blob approach failed, trying direct data URL:', blobError);
          
          // Fallback to direct data URL approach
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `${filename}.${exportFormat.toLowerCase()}`;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          console.log('Direct data URL download triggered');
        }

        // Track download event
        trackEvent(ANALYTICS_EVENTS.QR_DOWNLOADED, {
          qrId,
          format: exportFormat,
          size: qrSize
        });
      } else {
        console.log('No dataUrl generated, even with fallback');
      }
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };

  // Batch generate QR codes
  const generateBatchQRCodes = async () => {
    if (!batchData.trim()) return;

    const lines = batchData.split('\n').filter(line => line.trim());
    const zip = new JSZip();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      try {
        const dataUrl = await QRCode.toDataURL(line, {
          width: qrSize,
          margin: margin,
          color: {
            dark: qrColor,
            light: bgColor
          },
          errorCorrectionLevel: errorLevel
        });

        // Convert data URL to blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        
        zip.file(`qr-code-${i + 1}.png`, blob);
      } catch (error) {
        console.error(`Error generating QR code for line ${i + 1}:`, error);
      }
    }

    // Download zip file
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipBlob);
    link.download = `qr-codes-batch-${Date.now()}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Load QR from history
  const loadFromHistory = (item: any) => {
    setQrType(item.type);
    setQrSize(item.settings.size);
    setQrColor(item.settings.color);
    setBgColor(item.settings.bgColor);
    setErrorLevel(item.settings.errorLevel);
    setPattern(item.settings.pattern || 'square');
    
    // Set appropriate data based on type
    switch (item.type) {
      case QR_TYPES.URL:
        setUrlData(item.data);
        break;
      case QR_TYPES.TEXT:
        setTextData(item.data);
        break;
      // Add more cases as needed
      default:
        setQrData(item.data);
    }
  };

  // Analytics and Tracking Functions
  const generateQRId = () => {
    return 'qr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  const trackEvent = (event: string, data: any = {}) => {
    if (!trackingEnabled) return;
    
    const eventData = {
      id: generateQRId(),
      event,
      timestamp: new Date().toISOString(),
      qrType,
      qrId,
      ...data
    };
    
    setQrAnalytics(prev => [...prev.slice(-49), eventData]); // Keep last 50 events
  };

  const getAnalyticsStats = () => {
    const stats = {
      totalGenerated: qrAnalytics.filter(e => e.event === ANALYTICS_EVENTS.QR_GENERATED).length,
      totalDownloads: qrAnalytics.filter(e => e.event === ANALYTICS_EVENTS.QR_DOWNLOADED).length,
      totalScans: qrAnalytics.filter(e => e.event === ANALYTICS_EVENTS.QR_SCANNED).length,
      popularType: '',
      recentActivity: qrAnalytics.slice(-10)
    };
    
    // Find most popular QR type
    const typeCounts = qrAnalytics.reduce((acc, event) => {
      if (event.qrType) {
        acc[event.qrType] = (acc[event.qrType] || 0) + 1;
      }
      return acc;
    }, {});
    
    stats.popularType = Object.keys(typeCounts).reduce((a, b) => 
      typeCounts[a] > typeCounts[b] ? a : b, Object.keys(typeCounts)[0] || 'url'
    );
    
    return stats;
  };

  // QR Code Validation
  const validateQRCode = async () => {
    setIsValidating(true);
    setValidationResult(null);
    
    try {
      const data = generateQRData();
      const result = {
        isValid: true,
        dataLength: data.length,
        estimatedScanTime: data.length < 100 ? 'Fast' : data.length < 500 ? 'Medium' : 'Slow',
        recommendations: [],
        errorLevel: errorLevel,
        size: qrSize
      };
      
      // Add recommendations
      if (data.length > 1000) {
        result.recommendations.push('Consider reducing data length for better scanning');
      }
      if (qrSize < 200) {
        result.recommendations.push('Increase size for better readability');
      }
      if (errorLevel === 'L' && logoFile) {
        result.recommendations.push('Use higher error correction with logo');
      }
      
      setValidationResult(result);
    } catch (error) {
      setValidationResult({
        isValid: false,
        error: 'Invalid QR code data',
        recommendations: ['Check your input data for errors']
      });
    }
    
    setIsValidating(false);
  };

  // Social Sharing Functions
  const shareToSocial = (platform: string) => {
    const url = window.location.href;
    const text = shareMessage;
    
    const shareUrls = {
      [SOCIAL_PLATFORMS.FACEBOOK]: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      [SOCIAL_PLATFORMS.TWITTER]: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      [SOCIAL_PLATFORMS.LINKEDIN]: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      [SOCIAL_PLATFORMS.WHATSAPP]: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      [SOCIAL_PLATFORMS.TELEGRAM]: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
      trackEvent('social_share', { platform });
    }
  };

  // Campaign Management
  const createCampaign = () => {
    if (!campaignName.trim()) return;
    
    const campaign = {
      id: generateQRId(),
      name: campaignName,
      tags: campaignTags,
      qrCodes: [],
      createdAt: new Date().toISOString(),
      stats: { generated: 0, downloaded: 0, scanned: 0 }
    };
    
    setCampaigns(prev => [...prev, campaign]);
    setCampaignName('');
    setCampaignTags([]);
    trackEvent('campaign_created', { campaignId: campaign.id });
  };

  const addToCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, qrCodes: [...campaign.qrCodes, { qrId, data: generateQRData(), createdAt: new Date().toISOString() }] }
        : campaign
    ));
  };

  // Advanced Design Functions
  const applyGradient = (canvas: HTMLCanvasElement) => {
    if (!gradientEnabled) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, gradientStart);
    gradient.addColorStop(1, gradientEnd);
    
    // Apply gradient to QR code pixels
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) { // Black pixels
        const x = (i / 4) % canvas.width;
        const y = Math.floor((i / 4) / canvas.width);
        const ratio = x / canvas.width;
        
        // Interpolate gradient colors
        const r = parseInt(gradientStart.slice(1, 3), 16) * (1 - ratio) + parseInt(gradientEnd.slice(1, 3), 16) * ratio;
        const g = parseInt(gradientStart.slice(3, 5), 16) * (1 - ratio) + parseInt(gradientEnd.slice(3, 5), 16) * ratio;
        const b = parseInt(gradientStart.slice(5, 7), 16) * (1 - ratio) + parseInt(gradientEnd.slice(5, 7), 16) * ratio;
        
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  };

  const applyFrame = (canvas: HTMLCanvasElement) => {
    if (qrFrame === QR_FRAMES.NONE) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const frameSize = 20;
    ctx.strokeStyle = qrColor;
    ctx.lineWidth = 4;
    
    switch (qrFrame) {
      case QR_FRAMES.ROUNDED:
        // Create rounded rectangle manually for better browser compatibility
        const x = frameSize;
        const y = frameSize;
        const width = canvas.width - frameSize * 2;
        const height = canvas.height - frameSize * 2;
        const radius = 10;
        
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.stroke();
        break;
      case QR_FRAMES.SQUARE:
        ctx.strokeRect(frameSize, frameSize, canvas.width - frameSize * 2, canvas.height - frameSize * 2);
        break;
      case QR_FRAMES.CIRCLE:
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.width - frameSize * 2) / 2, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      case QR_FRAMES.MODERN:
        // Modern frame with corner accents
        const cornerSize = 30;
        ctx.beginPath();
        // Top-left corner
        ctx.moveTo(frameSize, frameSize + cornerSize);
        ctx.lineTo(frameSize, frameSize);
        ctx.lineTo(frameSize + cornerSize, frameSize);
        // Top-right corner
        ctx.moveTo(canvas.width - frameSize - cornerSize, frameSize);
        ctx.lineTo(canvas.width - frameSize, frameSize);
        ctx.lineTo(canvas.width - frameSize, frameSize + cornerSize);
        // Bottom-right corner
        ctx.moveTo(canvas.width - frameSize, canvas.height - frameSize - cornerSize);
        ctx.lineTo(canvas.width - frameSize, canvas.height - frameSize);
        ctx.lineTo(canvas.width - frameSize - cornerSize, canvas.height - frameSize);
        // Bottom-left corner
        ctx.moveTo(frameSize + cornerSize, canvas.height - frameSize);
        ctx.lineTo(frameSize, canvas.height - frameSize);
        ctx.lineTo(frameSize, canvas.height - frameSize - cornerSize);
        ctx.stroke();
        break;
    }
  };

  // Generate QR code on initial load
  useEffect(() => {
    generateQRCode();
  }, []);

  return (
    <div className="qr-generator-container">
      {/* Hero Section */}
      <section className="qr-hero-section">
        <div className="qr-hero-container">
          <div className="qr-hero-tag">
            <span className="qr-year">2025</span>
            <span className="qr-tag-text">QR Generator Service</span>
          </div>
          
          <h1 className="qr-hero-heading">
            Professional <span>QR Code Generator</span> Solutions
          </h1>
          
          <p className="qr-hero-subtext">
            Create custom QR codes for your business, products, or personal use.
            Fast, secure, and highly customizable QR code generation.
          </p>
          
          <div className="qr-hero-buttons">
            <button 
              className="qr-btn primary"
              onClick={() => document.getElementById('generator-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Create QR Code Now
            </button>
            <button className="qr-btn secondary">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section id="generator-section" className="qr-generator-section">
        <div className="qr-generator-wrapper">
          <div className="qr-generator-content">
            <div className="qr-generator-tag">
              <span className="qr-year">Create</span>
              <span className="qr-tag-text">QR Code Generator</span>
            </div>
            
            <h2 className="qr-generator-heading">
              Generate QR Codes <span>Instantly</span>
            </h2>
            
            <div className="qr-generator-interface">
              <div className="qr-generator-form">
                {/* QR Type Selection */}
                <div className="qr-form-group">
                  <label htmlFor="qr-type">QR Code Type</label>
                  <select
                    id="qr-type"
                    value={qrType}
                    onChange={(e) => setQrType(e.target.value)}
                    className="qr-select"
                  >
                    <option value={QR_TYPES.URL}>Website URL</option>
                    <option value={QR_TYPES.TEXT}>Plain Text</option>
                    <option value={QR_TYPES.EMAIL}>Email</option>
                    <option value={QR_TYPES.PHONE}>Phone Number</option>
                    <option value={QR_TYPES.SMS}>SMS Message</option>
                    <option value={QR_TYPES.WIFI}>WiFi Network</option>
                    <option value={QR_TYPES.VCARD}>Contact Card</option>
                    <option value={QR_TYPES.LOCATION}>Location</option>
                    <option value={QR_TYPES.EVENT}>Calendar Event</option>
                    <option value={QR_TYPES.CRYPTO}>Cryptocurrency</option>
                  </select>
                </div>

                {/* Dynamic Form Fields Based on QR Type */}
                {qrType === QR_TYPES.URL && (
                  <div className="qr-form-group">
                    <label htmlFor="url-data">Website URL</label>
                    <input
                      id="url-data"
                      type="url"
                      value={urlData}
                      onChange={(e) => setUrlData(e.target.value)}
                      placeholder="https://example.com"
                      className="qr-input"
                    />
                  </div>
                )}

                {qrType === QR_TYPES.TEXT && (
                  <div className="qr-form-group">
                    <label htmlFor="text-data">Text Content</label>
                    <textarea
                      id="text-data"
                      value={textData}
                      onChange={(e) => setTextData(e.target.value)}
                      placeholder="Enter your text here..."
                      className="qr-textarea"
                      rows={3}
                    />
                  </div>
                )}

                {qrType === QR_TYPES.EMAIL && (
                  <div className="qr-form-group">
                    <label>Email Details</label>
                    <input
                      type="email"
                      value={emailData.email}
                      onChange={(e) => setEmailData({...emailData, email: e.target.value})}
                      placeholder="recipient@example.com"
                      className="qr-input"
                    />
                    <input
                      type="text"
                      value={emailData.subject}
                      onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                      placeholder="Subject (optional)"
                      className="qr-input"
                    />
                    <textarea
                      value={emailData.body}
                      onChange={(e) => setEmailData({...emailData, body: e.target.value})}
                      placeholder="Message body (optional)"
                      className="qr-textarea"
                      rows={2}
                    />
                  </div>
                )}

                {qrType === QR_TYPES.PHONE && (
                  <div className="qr-form-group">
                    <label htmlFor="phone-data">Phone Number</label>
                    <input
                      id="phone-data"
                      type="tel"
                      value={phoneData}
                      onChange={(e) => setPhoneData(e.target.value)}
                      placeholder="+1234567890"
                      className="qr-input"
                    />
                  </div>
                )}

                {qrType === QR_TYPES.SMS && (
                  <div className="qr-form-group">
                    <label>SMS Details</label>
                    <input
                      type="tel"
                      value={smsData.phone}
                      onChange={(e) => setSmsData({...smsData, phone: e.target.value})}
                      placeholder="Phone number"
                      className="qr-input"
                    />
                    <textarea
                      value={smsData.message}
                      onChange={(e) => setSmsData({...smsData, message: e.target.value})}
                      placeholder="Message (optional)"
                      className="qr-textarea"
                      rows={2}
                    />
                  </div>
                )}

                {qrType === QR_TYPES.WIFI && (
                  <div className="qr-form-group">
                    <label>WiFi Network</label>
                    <input
                      type="text"
                      value={wifiData.ssid}
                      onChange={(e) => setWifiData({...wifiData, ssid: e.target.value})}
                      placeholder="Network Name (SSID)"
                      className="qr-input"
                    />
                    <input
                      type="password"
                      value={wifiData.password}
                      onChange={(e) => setWifiData({...wifiData, password: e.target.value})}
                      placeholder="Password"
                      className="qr-input"
                    />
                    <select
                      value={wifiData.security}
                      onChange={(e) => setWifiData({...wifiData, security: e.target.value})}
                      className="qr-select"
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">No Password</option>
                    </select>
                    <label className="qr-checkbox">
                      <input
                        type="checkbox"
                        checked={wifiData.hidden}
                        onChange={(e) => setWifiData({...wifiData, hidden: e.target.checked})}
                      />
                      Hidden Network
                    </label>
                  </div>
                )}

                {qrType === QR_TYPES.VCARD && (
                  <div className="qr-form-group">
                    <label>Contact Information</label>
                    <div className="qr-form-row">
                      <input
                        type="text"
                        value={vcardData.firstName}
                        onChange={(e) => setVcardData({...vcardData, firstName: e.target.value})}
                        placeholder="First Name"
                        className="qr-input"
                      />
                      <input
                        type="text"
                        value={vcardData.lastName}
                        onChange={(e) => setVcardData({...vcardData, lastName: e.target.value})}
                        placeholder="Last Name"
                        className="qr-input"
                      />
                    </div>
                    <input
                      type="text"
                      value={vcardData.organization}
                      onChange={(e) => setVcardData({...vcardData, organization: e.target.value})}
                      placeholder="Organization"
                      className="qr-input"
                    />
                    <input
                      type="tel"
                      value={vcardData.phone}
                      onChange={(e) => setVcardData({...vcardData, phone: e.target.value})}
                      placeholder="Phone"
                      className="qr-input"
                    />
                    <input
                      type="email"
                      value={vcardData.email}
                      onChange={(e) => setVcardData({...vcardData, email: e.target.value})}
                      placeholder="Email"
                      className="qr-input"
                    />
                    <input
                      type="url"
                      value={vcardData.url}
                      onChange={(e) => setVcardData({...vcardData, url: e.target.value})}
                      placeholder="Website"
                      className="qr-input"
                    />
                    <textarea
                      value={vcardData.address}
                      onChange={(e) => setVcardData({...vcardData, address: e.target.value})}
                      placeholder="Address"
                      className="qr-textarea"
                      rows={2}
                    />
                  </div>
                )}

                {/* Templates */}
                <div className="qr-form-group">
                  <label>Quick Templates</label>
                  <div className="qr-templates">
                    {Object.entries(QR_TEMPLATES).map(([name, template]) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => applyTemplate(name)}
                        className="qr-template-btn"
                        style={{
                          backgroundColor: template.bgColor,
                          color: template.color,
                          border: `2px solid ${template.color}`
                        }}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advanced Customization */}
                <div className="qr-form-group">
                  <label>Customization</label>
                  <div className="qr-form-row">
                    <div className="qr-form-group">
                      <label htmlFor="qr-size">Size (px)</label>
                      <input
                        id="qr-size"
                        type="number"
                        min="100"
                        max="1000"
                        value={qrSize}
                        onChange={(e) => setQrSize(Number(e.target.value))}
                        className="qr-input"
                      />
                    </div>
                    
                    <div className="qr-form-group">
                      <label htmlFor="qr-margin">Margin</label>
                      <input
                        id="qr-margin"
                        type="number"
                        min="0"
                        max="50"
                        value={margin}
                        onChange={(e) => setMargin(Number(e.target.value))}
                        className="qr-input"
                      />
                    </div>
                  </div>

                  <div className="qr-form-row">
                    <div className="qr-form-group">
                      <label htmlFor="qr-color">QR Color</label>
                      <input
                        id="qr-color"
                        type="color"
                        value={qrColor}
                        onChange={(e) => setQrColor(e.target.value)}
                        className="qr-color-input"
                      />
                    </div>
                    
                    <div className="qr-form-group">
                      <label htmlFor="bg-color">Background</label>
                      <input
                        id="bg-color"
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="qr-color-input"
                      />
                    </div>
                  </div>

                  <div className="qr-form-row">
                    <div className="qr-form-group">
                      <label htmlFor="error-level">Error Correction</label>
                      <select
                        id="error-level"
                        value={errorLevel}
                        onChange={(e) => setErrorLevel(e.target.value)}
                        className="qr-select"
                      >
                        <option value={ERROR_LEVELS.L}>Low (7%)</option>
                        <option value={ERROR_LEVELS.M}>Medium (15%)</option>
                        <option value={ERROR_LEVELS.Q}>Quartile (25%)</option>
                        <option value={ERROR_LEVELS.H}>High (30%)</option>
                      </select>
                    </div>

                    <div className="qr-form-group">
                      <label htmlFor="export-format">Export Format</label>
                      <select
                        id="export-format"
                        value={exportFormat}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="qr-select"
                      >
                        <option value="PNG">PNG</option>
                        <option value="JPG">JPG</option>
                        <option value="SVG">SVG</option>
                      </select>
                    </div>
                  </div>

                  {/* Logo Upload */}
                  <div className="qr-form-group">
                    <label htmlFor="logo-upload">Logo (Optional)</label>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="qr-file-input"
                    />
                    {logoFile && (
                      <div className="qr-logo-preview">
                        <img 
                          ref={logoRef}
                          src={URL.createObjectURL(logoFile)} 
                          alt="Logo preview"
                          style={{ maxWidth: '50px', maxHeight: '50px' }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Advanced Design Features */}
                  <div className="qr-form-group">
                    <label>Advanced Design</label>
                    
                    <div className="qr-form-row">
                      <div className="qr-form-group">
                        <label htmlFor="qr-frame">Frame Style</label>
                        <select
                          id="qr-frame"
                          value={qrFrame}
                          onChange={(e) => setQrFrame(e.target.value)}
                          className="qr-select"
                        >
                          <option value={QR_FRAMES.NONE}>No Frame</option>
                          <option value={QR_FRAMES.ROUNDED}>Rounded</option>
                          <option value={QR_FRAMES.SQUARE}>Square</option>
                          <option value={QR_FRAMES.CIRCLE}>Circle</option>
                          <option value={QR_FRAMES.MODERN}>Modern</option>
                        </select>
                      </div>

                      <div className="qr-form-group">
                        <label htmlFor="border-radius">Border Radius</label>
                        <input
                          id="border-radius"
                          type="number"
                          min="0"
                          max="50"
                          value={borderRadius}
                          onChange={(e) => setBorderRadius(Number(e.target.value))}
                          className="qr-input"
                        />
                      </div>
                    </div>

                    <div className="qr-form-row">
                      <div className="qr-form-group">
                        <label className="qr-checkbox-label">
                          <input
                            type="checkbox"
                            checked={gradientEnabled}
                            onChange={(e) => setGradientEnabled(e.target.checked)}
                            className="qr-checkbox"
                          />
                          Enable Gradient
                        </label>
                      </div>

                      <div className="qr-form-group">
                        <label className="qr-checkbox-label">
                          <input
                            type="checkbox"
                            checked={shadowEnabled}
                            onChange={(e) => setShadowEnabled(e.target.checked)}
                            className="qr-checkbox"
                          />
                          Add Shadow
                        </label>
                      </div>
                    </div>

                    {gradientEnabled && (
                      <div className="qr-form-row">
                        <div className="qr-form-group">
                          <label htmlFor="gradient-start">Gradient Start</label>
                          <input
                            id="gradient-start"
                            type="color"
                            value={gradientStart}
                            onChange={(e) => setGradientStart(e.target.value)}
                            className="qr-color-input"
                          />
                        </div>
                        
                        <div className="qr-form-group">
                          <label htmlFor="gradient-end">Gradient End</label>
                          <input
                            id="gradient-end"
                            type="color"
                            value={gradientEnd}
                            onChange={(e) => setGradientEnd(e.target.value)}
                            className="qr-color-input"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Security & Dynamic Features */}
                  <div className="qr-form-group">
                    <label>Security & Dynamic Features</label>
                    
                    <div className="qr-form-row">
                      <div className="qr-form-group">
                        <label className="qr-checkbox-label">
                          <input
                            type="checkbox"
                            checked={isDynamic}
                            onChange={(e) => setIsDynamic(e.target.checked)}
                            className="qr-checkbox"
                          />
                          Dynamic QR Code
                        </label>
                      </div>

                      <div className="qr-form-group">
                        <label className="qr-checkbox-label">
                          <input
                            type="checkbox"
                            checked={passwordProtected}
                            onChange={(e) => setPasswordProtected(e.target.checked)}
                            className="qr-checkbox"
                          />
                          Password Protected
                        </label>
                      </div>
                    </div>

                    {passwordProtected && (
                      <div className="qr-form-group">
                        <label htmlFor="qr-password">Password</label>
                        <input
                          id="qr-password"
                          type="password"
                          value={qrPassword}
                          onChange={(e) => setQrPassword(e.target.value)}
                          placeholder="Enter password"
                          className="qr-input"
                        />
                      </div>
                    )}

                    <div className="qr-form-group">
                      <label htmlFor="expiration-date">Expiration Date (Optional)</label>
                      <input
                        id="expiration-date"
                        type="datetime-local"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        className="qr-input"
                      />
                    </div>
                  </div>

                  {/* Campaign Management */}
                  <div className="qr-form-group">
                    <label>Campaign Management</label>
                    
                    <div className="qr-form-row">
                      <div className="qr-form-group">
                        <label htmlFor="campaign-name">Campaign Name</label>
                        <input
                          id="campaign-name"
                          type="text"
                          value={campaignName}
                          onChange={(e) => setCampaignName(e.target.value)}
                          placeholder="e.g., Summer Sale 2025"
                          className="qr-input"
                        />
                      </div>

                      <div className="qr-form-group">
                        <label htmlFor="campaign-tags">Tags</label>
                        <input
                          id="campaign-tags"
                          type="text"
                          value={campaignTags}
                          onChange={(e) => setCampaignTags(e.target.value)}
                          placeholder="marketing, sale, social"
                          className="qr-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Analytics & Tracking */}
                  <div className="qr-form-group">
                    <label>Analytics & Tracking</label>
                    
                    <div className="qr-form-row">
                      <div className="qr-form-group">
                        <label className="qr-checkbox-label">
                          <input
                            type="checkbox"
                            checked={trackingEnabled}
                            onChange={(e) => setTrackingEnabled(e.target.checked)}
                            className="qr-checkbox"
                          />
                          Enable Analytics
                        </label>
                      </div>

                      <div className="qr-form-group">
                        <label className="qr-checkbox-label">
                          <input
                            type="checkbox"
                            checked={geoTracking}
                            onChange={(e) => setGeoTracking(e.target.checked)}
                            className="qr-checkbox"
                          />
                          Location Tracking
                        </label>
                      </div>
                    </div>

                    {trackingEnabled && (
                      <div className="qr-analytics-preview">
                        <h4>Analytics Preview</h4>
                        <div className="qr-analytics-stats">
                          <div className="qr-stat">
                            <span className="qr-stat-label">Total Scans:</span>
                            <span className="qr-stat-value">{qrAnalytics.totalScans}</span>
                          </div>
                          <div className="qr-stat">
                            <span className="qr-stat-label">Unique Scans:</span>
                            <span className="qr-stat-value">{qrAnalytics.uniqueScans}</span>
                          </div>
                          <div className="qr-stat">
                            <span className="qr-stat-label">Last Scan:</span>
                            <span className="qr-stat-value">
                              {qrAnalytics.lastScan ? new Date(qrAnalytics.lastScan).toLocaleDateString() : 'Never'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="qr-form-actions">
                  <button 
                    className="qr-btn primary"
                    onClick={generateQRCode}
                    disabled={isGenerating}
                  >
                    {isGenerating ? 'Generating...' : 'Generate QR Code'}
                  </button>
                </div>

                {/* Batch Generation */}
                <div className="qr-form-group">
                  <label htmlFor="batch-data">Batch Generation</label>
                  <textarea
                    id="batch-data"
                    value={batchData}
                    onChange={(e) => setBatchData(e.target.value)}
                    placeholder="Enter multiple URLs or text (one per line)"
                    className="qr-textarea"
                    rows={4}
                  />
                  <button 
                    className="qr-btn secondary"
                    onClick={generateBatchQRCodes}
                    disabled={!batchData.trim()}
                  >
                    Generate Batch QR Codes
                  </button>
                </div>
                
                {error && (
                  <div className="qr-error">
                    <strong>Error:</strong> {error}
                  </div>
                )}
              </div>
              
              <div className="qr-preview">
                <div className="qr-preview-container">
                  {qrImage ? (
                    <img 
                      src={qrImage} 
                      alt="Generated QR Code" 
                      className="qr-preview-image"
                    />
                  ) : (
                    <div className="qr-placeholder">
                      <div className="qr-placeholder-icon">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <rect x="7" y="7" width="3" height="3"/>
                          <rect x="14" y="7" width="3" height="3"/>
                          <rect x="7" y="14" width="3" height="3"/>
                          <rect x="14" y="14" width="3" height="3"/>
                        </svg>
                      </div>
                      <p>QR Code will appear here</p>
                    </div>
                  )}
                  {/* Hidden canvas for QR generation with advanced features */}
                  <canvas 
                    ref={canvasRef}
                    style={{ display: 'none' }}
                    width={qrSize}
                    height={qrSize}
                  />
                </div>
                
                {qrImage && (
                  <div className="qr-preview-actions">
                    <button 
                      className="qr-btn primary"
                      onClick={downloadQRCode}
                    >
                      Download as {exportFormat}
                    </button>
                    
                    {/* QR Code Validation */}
                    <button 
                      className="qr-btn secondary"
                      onClick={validateQRCode}
                      disabled={isValidating}
                    >
                      {isValidating ? 'Validating...' : 'Validate QR Code'}
                    </button>

                    {/* Social Sharing */}
                    <button 
                      className="qr-btn secondary"
                      onClick={() => setShowSocialShare(!showSocialShare)}
                    >
                      Share QR Code
                    </button>

                    <div className="qr-preview-info">
                      <p>Type: {qrType.toUpperCase()}</p>
                      <p>Size: {qrSize}px</p>
                      <p>Error Level: {errorLevel}</p>
                      {qrId && <p>QR ID: {qrId}</p>}
                      
                      {/* Security and Dynamic Features Status */}
                      <div className="qr-features-status">
                        {isDynamic && (
                          <div className="qr-feature-indicator dynamic">
                            <span className="feature-icon">🔄</span>
                            <span>Dynamic QR</span>
                          </div>
                        )}
                        
                        {passwordProtected && (
                          <div className="qr-feature-indicator secure">
                            <span className="feature-icon">🔒</span>
                            <span>Password Protected</span>
                          </div>
                        )}
                        
                        {expirationDate && (
                          <div className={`qr-feature-indicator expiration ${isExpired(expirationDate) ? 'expired' : 'active'}`}>
                            <span className="feature-icon">⏰</span>
                            <span>{isExpired(expirationDate) ? 'Expired' : 'Expires'}: {new Date(expirationDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Validation Results */}
                    {validationResult && (
                      <div className={`qr-validation-result ${validationResult.isValid ? 'valid' : 'invalid'}`}>
                        <h4>Validation Results</h4>
                        <div className="qr-validation-details">
                          <p><strong>Status:</strong> {validationResult.isValid ? 'Valid' : 'Invalid'}</p>
                          <p><strong>Data Length:</strong> {validationResult.dataLength} characters</p>
                          <p><strong>Estimated Scan Time:</strong> {validationResult.scanTime}ms</p>
                          <p><strong>Readability Score:</strong> {validationResult.readabilityScore}/100</p>
                          {validationResult.recommendations.length > 0 && (
                            <div className="qr-recommendations">
                              <strong>Recommendations:</strong>
                              <ul>
                                {validationResult.recommendations.map((rec, index) => (
                                  <li key={index}>{rec}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Social Sharing Panel */}
                    {showSocialShare && (
                      <div className="qr-social-share">
                        <h4>Share QR Code</h4>
                        <div className="qr-share-message">
                          <label htmlFor="share-message">Custom Message</label>
                          <textarea
                            id="share-message"
                            value={shareMessage}
                            onChange={(e) => setShareMessage(e.target.value)}
                            placeholder="Check out this QR code!"
                            className="qr-textarea"
                            rows={2}
                          />
                        </div>
                        <div className="qr-social-buttons">
                          <button 
                            className="qr-social-btn facebook"
                            onClick={() => shareToSocial(SOCIAL_PLATFORMS.FACEBOOK)}
                          >
                            Facebook
                          </button>
                          <button 
                            className="qr-social-btn twitter"
                            onClick={() => shareToSocial(SOCIAL_PLATFORMS.TWITTER)}
                          >
                            Twitter
                          </button>
                          <button 
                            className="qr-social-btn linkedin"
                            onClick={() => shareToSocial(SOCIAL_PLATFORMS.LINKEDIN)}
                          >
                            LinkedIn
                          </button>
                          <button 
                            className="qr-social-btn whatsapp"
                            onClick={() => shareToSocial(SOCIAL_PLATFORMS.WHATSAPP)}
                          >
                            WhatsApp
                          </button>
                          <button 
                            className="qr-social-btn telegram"
                            onClick={() => shareToSocial(SOCIAL_PLATFORMS.TELEGRAM)}
                          >
                            Telegram
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR History Section */}
      {qrHistory.length > 0 && (
        <section className="qr-history-section">
          <div className="qr-history-container">
            <div className="qr-history-tag">
              <span className="qr-year">Recent</span>
              <span className="qr-tag-text">QR History</span>
            </div>
            
            <h2 className="qr-history-heading">
              Your Recent <span>QR Codes</span>
            </h2>
            
            <div className="qr-history-grid">
              {qrHistory.map((item) => (
                <div key={item.id} className="qr-history-item">
                  <div className="qr-history-preview">
                    <div className="qr-history-type">{item.type.toUpperCase()}</div>
                    <div className="qr-history-data" title={item.data}>
                      {item.data.length > 30 ? `${item.data.substring(0, 30)}...` : item.data}
                    </div>
                    <div className="qr-history-timestamp">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="qr-history-actions">
                    <button 
                      className="qr-btn small"
                      onClick={() => loadFromHistory(item)}
                    >
                      Load
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="qr-history-actions">
              <button 
                className="qr-btn secondary"
                onClick={() => setQrHistory([])}
              >
                Clear History
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="qr-features-section">
        <div className="qr-features-container">
          <div className="qr-features-tag">
            <span className="qr-year">Pro</span>
            <span className="qr-tag-text">Features</span>
          </div>
          
          <h2 className="qr-features-heading">
            Why Choose Our <span>QR Generator</span>
          </h2>
          
          <div className="qr-features-grid">
            <div className="qr-feature-card">
              <div className="qr-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3>Lightning Fast</h3>
              <p>Generate QR codes instantly with our high-performance engine</p>
            </div>
            
            <div className="qr-feature-card">
              <div className="qr-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Secure & Private</h3>
              <p>All QR code generation happens locally in your browser - no data sent to servers</p>
            </div>
            
            <div className="qr-feature-card">
              <div className="qr-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <h3>Customizable</h3>
              <p>Personalize your QR codes with custom colors, sizes, and formats</p>
            </div>
            
            <div className="qr-feature-card">
              <div className="qr-feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </div>
              <h3>Multiple Formats</h3>
              <p>Generate QR codes for URLs, text, contact info, and more</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="qr-cta-section">
        <div className="qr-cta-container">
          <div className="qr-cta-content">
            <div className="qr-cta-tag">
              <span className="qr-year">Ready</span>
              <span className="qr-tag-text">Get Started</span>
            </div>
            
            <h2 className="qr-cta-heading">
              Need Custom QR <span>Solutions?</span>
            </h2>
            
            <p className="qr-cta-description">
              Looking for enterprise QR code solutions, bulk generation, or custom integrations? 
              Our team can build tailored QR code systems for your business needs.
            </p>
            
            <div className="qr-cta-buttons">
              <button className="qr-btn primary">
                Contact Our Team
              </button>
              <button className="qr-btn secondary">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QRGeneratorContent;