import React from 'react';
import { useParams } from 'react-router-dom';
import ShopPage from '../ShopPage';

const COLLECTION_CONFIG = {
  khussa: {
    title: 'The Royal Khussa Collection',
    category: 'khussa',
    description:
      'Imperial Pakistani handcrafted Khussa footwear made with vegetable-tanned leather, heavy zardozi, antique dabka, and pearl embroidery. Designed for royalty, worn for grand celebrations.',
  },
  shabri: {
    title: 'Traditional Shabri Chappals',
    category: 'shabri',
    description:
      'Hailing from the princely heritage of Bahawalpur, featuring wide protective soles, muscular silhouettes, and heavy hand-braided leather stitching.',
  },
  saraiki: {
    title: 'Saraiki Traditional Chappals',
    category: 'saraiki',
    description:
      'Masterpieces of Multani leathercraft featuring iconic double-layered flared winged soles, floral perforations, and contrasting silk needlework.',
  },
  bridal: {
    title: 'Royal Bridal & Trousseau Collection',
    category: 'bridal',
    description:
      'Heirloom bridal footwear and ceremonial embroidered potli pouches encrusted with 24K-tone antique gold zardozi, seed pearls, and Austrian crystals.',
  },
  mehndi: {
    title: 'Mehndi Festive Footwear',
    category: 'mehndi',
    description:
      'Celebratory, vibrant footwear adorned with traditional silver-leaf gota kinari, reflective mirrorwork, and festive sunlit clay tones.',
  },
  'wedding-shawls': {
    title: 'Heirloom Wedding Shawls',
    category: 'shawls',
    description:
      'Imperial Doshala velvet and pure Kashmiri pashmina shawls with 4-inch heavy antique gold zardozi borders, hand-embroidered for winter weddings and royal galas.',
  },
};

export default function CollectionPage({ collectionKey }) {
  const params = useParams();
  const key = collectionKey || params.slug || 'khussa';
  const config = COLLECTION_CONFIG[key] || {
    title: 'Royal Collection',
    category: 'all',
    description: 'Explore the artisanal collections of ZAR-E-RIWAAYAT.',
  };

  return (
    <ShopPage
      initialCategory={config.category}
      pageTitle={config.title}
      pageDescription={config.description}
    />
  );
}
