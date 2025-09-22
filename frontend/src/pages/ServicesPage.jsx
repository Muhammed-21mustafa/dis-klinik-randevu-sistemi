import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Circle,
  Sparkles,
  Shield,
  Heart,
  Baby,
  Scissors,
  Zap,
  Award
} from 'lucide-react';
import ServiceCard from '../components/common/ServiceCard';

const ServicesPage = () => {
  const services = [
    {
      title: 'Ortodonti',
      description: 'Diş ve çene düzensizliklerinin tedavisi için modern ortodonti çözümleri. Tel tellaklar, şeffaf plaklar ve dijital ortodonti.',
      icon: Sparkles,
      features: [
        'Metal ve seramik braketler',
        'Şeffaf ortodonti (Invisalign)',
        'Dil tarafı ortodonti',
        'Çocuk ortodontisi'
      ]
    },
    {
      title: 'İmplantoloji',
      description: 'Eksik dişlerinizi en doğal şekilde tamamlayan implant tedavisi. Güvenli ve kalıcı çözümler.',
      icon: Circle,
      features: [
        'Tek diş implantı',
        'Çoklu implant tedavisi',
        'All-on-4 tekniği',
        'Kemik greftleme'
      ]
    },
    {
      title: 'Estetik Diş Hekimliği',
      description: 'Gülüş tasarımı ve estetik diş tedavileri ile hayalinizdeki gülüşe kavuşun.',
      icon: Sparkles,
      features: [
        'Porselen veneer',
        'Diş beyazlatma',
        'Bonding uygulaması',
        'Gülüş tasarımı'
      ]
    },
    {
      title: 'Periodontoloji',
      description: 'Diş eti hastalıklarının tanı ve tedavisi. Diş eti sağlığınızı koruyun.',
      icon: Heart,
      features: [
        'Diş eti tedavisi',
        'Küretaj işlemi',
        'Flap operasyonu',
        'Periodontal bakım'
      ]
    },
    {
      title: 'Endodonti',
      description: 'Kanal tedavisi uzmanı. Dişinizi kurtarmak için ağrısız kanal tedavileri.',
      icon: Shield,
      features: [
        'Kanal tedavisi',
        'Mikroskop altında kanal tedavisi',
        'Apikal rezeksiyon',
        'Travmatik diş tedavisi'
      ]
    },
    {
      title: 'Çene Cerrahisi',
      description: 'Ağız ve çene cerrahisi işlemleri. 20 yaş dişi çekimi ve çene problemleri.',
      icon: Scissors,
      features: [
        '20 yaş dişi çekimi',
        'Çene kisti tedavisi',
        'TME rahatsızlıkları',
        'Ortognatik cerrahi'
      ]
    },
    {
      title: 'Pedodonti',
      description: 'Çocuk diş hekimliği. Çocukların diş sağlığı için özel yaklaşım ve tedaviler.',
      icon: Baby,
      features: [
        'Çocuk diş tedavisi',
        'Florür uygulaması',
        'Fissür örtücü',
        'Süt dişi çekimi'
      ]
    },
    {
      title: 'Protez',
      description: 'Sabit ve hareketli protez çözümleri. Fonksiyonel ve estetik protez tedavileri.',
      icon: Award,
      features: [
        'Tam protez',
        'Kısmi protez',
        'Porselen kronlar',
        'Zirkonyum kaplama'
      ]
    }
  ];

  return (
    <div className="pt-24 pb-20 gradient-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="section-title">
            Hizmetlerimiz
          </h1>
          <p className="section-subtitle">
            Modern teknoloji ve uzman kadromuzla birlikte 
            kapsamlı ve kaliteli diş sağlığı hizmetleri sunuyoruz.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ServiceCard
                service={service}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center card bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-12 shadow-hard border border-primary-500/30"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Hangi Hizmete İhtiyacınız Var?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Uzman doktorlarımızla randevu alın ve sizin için en uygun tedaviyi belirleyin.
          </p>
          <a
            href="/randevu-al"
            className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 inline-flex items-center space-x-2 transform hover:scale-105 transition-all duration-300"
          >
            <span>Randevu Al</span>
            <Zap className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;