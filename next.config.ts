import type { NextConfig } from 'next';
import withNextIntl from 'next-intl/plugin';

const withIntl = withNextIntl('./next-intl.config.ts');

const nextConfig: NextConfig = {

};

export default withIntl(nextConfig);
