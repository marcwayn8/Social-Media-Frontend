import PropTypes from 'prop-types';
import Layout from '../../src/layouts';
// components
import Page from '../../src/components/Page';
// sections
// import { PricingMarketing } from '../../src/sections/pricing';
// import { TeamMarketingLangding } from '../../src/sections/team';
// import { BlogMarketingLatestPosts } from '../../src/sections/blog';
// import { NewsletterMarketing } from '../../src/sections/newsletter';
// import { TestimonialsMarketing } from '../../src/sections/testimonials';

import {
  MarketingLandingHero} from '../../src/sections/marketing-landing';
  import {MarketingLandingAbout} from '../../src/sections/marketing-landing/about';
  import{MarketingLandingProcess} from '../../src/sections/marketing-landing/process';
import {  MarketingLandingServices} from '../../src/sections/marketing-landing/services';


 



// ----------------------------------------------------------------------

MarketingLandingPage.propTypes = {
  caseStudies: PropTypes.array,
  posts: PropTypes.array,
};

export default function MarketingLandingPage({ posts, caseStudies }) {
  return (
    <Page title="Landing - Marketing">
      <MarketingLandingHero />
      <MarketingLandingAbout />

      <MarketingLandingServices />

      <MarketingLandingProcess />
    </Page>
  );
}

// ----------------------------------------------------------------------

MarketingLandingPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

