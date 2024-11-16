import Header from '@/components/shared/Header';
import { LandingPrimaryTextCtaSection } from '@/components/landing/cta/LandingPrimaryCta';
import { LandingProductHuntAward } from '@/components/landing/social-proof/LandingProductHuntAward';
import { LandingSocialProof } from '@/components/landing/social-proof/LandingSocialProof';
import { LandingDiscount } from '@/components/landing/discount/LandingDiscount';
import LatestArticles from '@/components/blog/LatestArticles';
import { LandingProductFeature } from '@/components/landing/LandingProductFeature';
import { LandingProductFeatureKeyPoints } from '@/components/landing/LandingProductFeatureKeyPoints';
import { LandingSaleCtaSection } from '@/components/landing/cta/LandingSaleCta';
import { LandingTestimonialGrid } from '@/components/landing/testimonial/LandingTestimonialGrid';
import { LandingBandSection } from '@/components/landing/LandingBand';
import { LandingTestimonialReadMoreWrapper } from '@/components/landing/testimonial/LandingTestimonialReadMoreWrapper';
import { LandingFeatureList } from '@/components/landing/feature/LandingFeatureList';
import { LandingFaqCollapsibleSection } from '@/components/landing/LandingFaqCollapsible';
import { LandingSocialProofBand } from '@/components/landing/social-proof/LandingSocialProofBand';
import { LandingSocialProofBandItem } from '@/components/landing/social-proof/LandingSocialProofBandItem';

import {
  ChromeIcon,
  FigmaIcon,
  FramerIcon,
  GithubIcon,
  LayersIcon,
  LightbulbIcon,
  LineChartIcon,
  SparklesIcon,
  ThumbsUpIcon,
  ZapIcon,
} from 'lucide-react';
import { Button } from '@/components/shared/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col w-full items-center fancy-overlay">
      {/* <LandingSocialProofBand invert={false} className="hidden md:flex">
        <LandingSocialProofBandItem>
          Fast, reliable, and secure
        </LandingSocialProofBandItem>

        <LandingSocialProofBandItem>
          Easy to use, easy to love
        </LandingSocialProofBandItem>

        <LandingSocialProofBandItem graphic="rating">
          99% customer satisfaction
        </LandingSocialProofBandItem>
      </LandingSocialProofBand> */}

      <Header className="mb-0 lg:mb-0" />

      <LandingPrimaryTextCtaSection
        title="Rare Deals and Discounts"
        descriptionComponent={<p className='max-w-2xl'>Save big on limited time details on selected SaaS, software, apps & services. Discounts for Black Friday, Cyber Monday & beyond.</p>}
        textPosition="left"
        withBackground
        // leadingComponent={<LandingProductHuntAward />}
      >
        {/* <LandingDiscount
          discountValueText="30% off"
          discountDescriptionText="for the first 10 customers (2 left)"
        /> */}

         <Button size="xl" variant="secondary" asChild>
        <a href="https://github.com/danmindru/rare-big-deal/pulls">Submit</a>
      </Button>

      <Button size="xl" variant="outlineSecondary">
        <a href="/all-deals">All Deals</a>
      </Button>

        <LandingSocialProof
          className="w-full mt-12"
          showRating
          numberOfUsers={99}
          suffixText="happy users"
          avatarItems={[
            {
              imageSrc: 'https://picsum.photos/id/64/100/100',
              name: 'John Doe',
            },
            {
              imageSrc: 'https://picsum.photos/id/65/100/100',
              name: 'Jane Doe',
            },
            {
              imageSrc: 'https://picsum.photos/id/669/100/100',
              name: 'Alice Doe',
            },
          ]}
        />
      </LandingPrimaryTextCtaSection>

       <section className="container-wide mt-12 p-6">
        <LatestArticles />
      </section>

      {/* <LandingProductFeature
        title="Limited Time Offers"
        descriptionComponent={
          <>
            <LandingProductFeatureKeyPoints
              keyPoints={[
                {
                  title: 'Intuitive Interface',
                  description:
                    'Design and customize your app easily with our simple drag-and-drop interface.',
                },
                {
                  title: 'Seamless Integration',
                  description:
                    'Connect your app with other tools effortlessly for a smoother workflow.',
                },
                {
                  title: 'Smart Analytics',
                  description:
                    'Gain valuable insights into user behavior and trends with our advanced analytics tools.',
                },
              ]}
            />

            <p className="text-sm">
              7 day free trial, no credit card required.
            </p>
          </>
        }
        imageSrc="/static/images/backdrop-19.webp"
        imageAlt="Screenshot of the product"
        imagePosition="left"
        imagePerspective="none"
      />

      <LandingProductFeature
        title="Diverse Selection"
        descriptionComponent={
          <>
            <p>
              Browse a vast range of carefully selected software, apps, and SaaS
              solutions that cater to various needs, ensuring you find exactly
              what fits your requirements.
            </p>

            <LandingProductFeatureKeyPoints
              keyPoints={[
                {
                  title: 'Rock-Solid Security',
                  description:
                    'Rest assured, your data is safe with our top-notch security measures.',
                },
                {
                  title: 'Automatic Updates',
                  description:
                    'Never miss out on the latest features - our app updates itself automatically!',
                },
                {
                  title: 'Scalability on Demand',
                  description:
                    'Grow your app along with your business needs, effortlessly expanding to meet demand.',
                },
              ]}
            />

            <p className="text-sm">Get started with our free tier.</p>
          </>
        }
        imageSrc="/static/images/backdrop-20.webp"
        imageAlt="Screenshot of the product"
        imagePosition="right"
        imagePerspective="none"
        withBackground
        withBackgroundGlow
        variant="secondary"
        backgroundGlowVariant="secondary"
      />

      <LandingProductFeature
        title="User-Friendly Experience"
        descriptionComponent={
          <>
            <p>
              Our platform features a seamless interface that allows easy
              navigation and quick access to all available deals, making your
              shopping experience smooth and enjoyable.
            </p>

            <p className="text-sm">First month is on us.</p>
          </>
        }
        imageSrc="/static/images/backdrop-5.webp"
        imageAlt="Screenshot of the product"
        imagePosition="left"
        imagePerspective="none"
        variant="secondary"
      /> */}

      <LandingBandSection
        title="4.9/5 stars"
        description="Our customers love our product."
        supportingComponent={
          <LandingSocialProof
            showRating
            numberOfUsers={99}
            avatarItems={[
              {
                imageSrc: 'https://picsum.photos/id/64/100/100',
                name: 'John Doe',
              },
              {
                imageSrc: 'https://picsum.photos/id/65/100/100',
                name: 'Jane Doe',
              },
              {
                imageSrc: 'https://picsum.photos/id/669/100/100',
                name: 'Alice Doe',
              },
            ]}
          />
        }
      />

      {/* <LandingProductFeature
        title="Rare Savings"
        descriptionComponent={
          <>
            Discover exclusive discounts on software, apps, and services you
            need.
          </>
        }
        withBackground
        variant="secondary"
        imageSrc="/static/images/product-sample.webp"
        imageAlt="Screenshot of the product"
        imagePosition="center"
        textPosition="center"
      />

      <LandingSaleCtaSection
        title="Act Now and Save"
        description="Limited time only! Take advantage of our extraordinary discounts available for Black Friday and well beyond. Visit rarebigdeal.com to secure your software savings today!"
        ctaHref={'#'}
        ctaLabel={'Pre-order now'}
        withBackgroundGlow
      /> */}

      <LandingTestimonialReadMoreWrapper size="md">
        <LandingTestimonialGrid
          title="Hear It from Our Users"
          description="Discover what our happy customers have to say about their experience with our AI app:"
          testimonialItems={[
            {
              name: 'John Smith',
              text: 'This app transformed our operations, boosting productivity like never before. Highly customizable and incredibly efficient!',
              handle: '@john_smith',
              imageSrc: 'https://picsum.photos/id/64/100/100',
            },
            {
              name: 'Emily Johnson',
              text: "Even with minimal tech knowledge, I could create my own app from scratch. It's empowering to have full control!",
              handle: '@emily_johnson',
              imageSrc: 'https://picsum.photos/id/65/100/100',
            },
            {
              name: 'David Rodriguez',
              text: 'Thanks to the analytics tools, we identified bottlenecks and saved significantly on costs. Truly impressive!',
              handle: '@david_rodriguez',
              imageSrc: 'https://picsum.photos/id/669/100/100',
              featured: true,
            },
            {
              name: 'Mandy',
              text: 'Excellent product!',
              handle: '@mandy',
              imageSrc: 'https://picsum.photos/id/829/100/100',
            },
            {
              name: 'Alex',
              text: 'Can easily recommend!',
              handle: '@alex',
              imageSrc: 'https://picsum.photos/100/100.webp?random=2',
            },
            {
              name: 'Sam',
              text: 'I am very happy with the results.',
              handle: '@sam',
              imageSrc: 'https://picsum.photos/100/100.webp?random=3',
            },
          ]}
          withBackgroundGlow
          withBackground
        />
      </LandingTestimonialReadMoreWrapper>

      {/* <LandingFeatureList
        title="Awesome Features Await!"
        description="Explore the fantastic features of our AI app:"
        featureItems={[
          {
            title: 'Intuitive Interface',
            description:
              'Design and customize your app easily with our simple drag-and-drop interface.',
            icon: <LayersIcon />,
          },
          {
            title: 'Seamless Integration',
            description:
              'Connect your app with other tools effortlessly for a smoother workflow.',
            icon: <LineChartIcon />,
          },
          {
            title: 'Smart Analytics',
            description:
              'Gain valuable insights into user behavior and trends with our advanced analytics tools.',
            icon: <SparklesIcon />,
          },
          {
            title: 'Rock-Solid Security',
            description:
              'Rest assured, your data is safe with our top-notch security measures.',
            icon: <LightbulbIcon />,
          },
          {
            title: 'Automatic Updates',
            description:
              'Never miss out on the latest features - our app updates itself automatically!',
            icon: <ZapIcon />,
          },
          {
            title: 'Scalability on Demand',
            description:
              'Grow your app along with your business needs, effortlessly expanding to meet demand.',
            icon: <ThumbsUpIcon />,
          },
          {
            title: 'Intelligent Assistance',
            description:
              'Receive personalized recommendations and insights tailored to your workflow, helping you make informed decisions and work more efficiently.',
            icon: <ChromeIcon />,
          },
          {
            title: 'Seamless Collaboration',
            description:
              'Easily collaborate with team members and clients in real-time, fostering productivity and enhancing communication across projects.',
            icon: <FigmaIcon />,
          },
          {
            title: 'Advanced Customization',
            description:
              'Tailor your app to fit your unique requirements with extensive customization options, ensuring it aligns perfectly with your business objectives.',
            icon: <FramerIcon />,
          },
        ]}
      /> */}

      <LandingFaqCollapsibleSection
        title="Got Questions? We've Got Answers!"
        description="Find answers to common inquiries about our AI app:"
        faqItems={[
          {
            question: 'Can I integrate my existing systems?',
            answer:
              'Absolutely! Our app seamlessly integrates with various other tools and systems.',
          },
          {
            question: 'Do I need coding skills?',
            answer:
              'Nope! Our user-friendly interface empowers anyone to create and manage their own app.',
          },
          {
            question: 'Is my data secure?',
            answer:
              'Absolutely! We take data security seriously, employing robust measures to keep your information safe.',
          },
        ]}
        withBackground
      />


    </div>
  );
}
