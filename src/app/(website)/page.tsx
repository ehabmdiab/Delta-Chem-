import React from 'react';
import { dataStore } from '@/lib/data/store';
import { HeroCarousel } from '@/components/organisms/HeroCarousel';
import { HomeAbout } from '@/components/organisms/HomeAbout';
import { ArshineProductCarousel } from '@/components/organisms/ArshineProductCarousel';
import { FeaturedProductsRail } from '@/components/organisms/FeaturedProductsRail';
import { CommercialModelSwitcher } from '@/components/organisms/CommercialModelSwitcher';
import { WarehouseTelemetryCard } from '@/components/organisms/WarehouseTelemetryCard';
import { FloatingQuickBar } from '@/components/molecules/FloatingQuickBar';
import { HomeSectionsClient } from '@/components/organisms/HomeSectionsClient';

export default async function HomePage() {
  const { products: featuredProducts } = await dataStore.getProducts({
    isFeatured: true,
    limit: 6,
  });
  const articles = await dataStore.getArticles({ limit: 3 });

  return (
    <>
      {/* 1. Hero banner swiper */}
      <HeroCarousel />

      {/* 2. About + live credentials + ticker */}
      <HomeAbout />

      {/* 3. Divisions horizontal swiper */}
      <ArshineProductCarousel />

      {/* 4. Featured products rail */}
      <FeaturedProductsRail products={featuredProducts} />

      {/* 5. Dual commercial operating frameworks */}
      <CommercialModelSwitcher />

      {/* 6. Harvest Pharma Cairo hub */}
      <WarehouseTelemetryCard />

      {/* 7, 8, 9: Quality, Insights & Contact sections (fully bilingual client component) */}
      <HomeSectionsClient articles={articles} />

      <FloatingQuickBar />
    </>
  );
}
