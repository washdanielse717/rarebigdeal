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
import HomeList from '@/components/blog/HomeList';
import stats from '@/data/stats';
import { metadata } from '@/data/config/metadata';

export default function Home() {
  const users = (stats.stars || 0) + (stats.forks || 0);
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
        descriptionComponent={
          <p className="max-w-2xl">
            Save big on limited time details on selected SaaS, software, apps &
            services. Discounts for Black Friday, Cyber Monday & beyond.
          </p>
        }
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
          numberOfUsers={users}
          suffixText="deal hunters"
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

      <section className="max-w-2xl 2xl:max-w-6xl w-full mt-12 p-6">
        <HomeList />
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
        title="Stars! Stars everywhere!"
        description="Our users love us! There's no place as beautiful to post a deal."
        supportingComponent={
          <LandingSocialProof
            showRating
            numberOfUsers={users}
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
          title="Hear It from Our Users (Coming soon)"
          description="Discover what our happy customers have to say about their experience with our AI app:"
          testimonialItems={[
            {
              name: 'John Smith',
              text: 'Unbelievable Black Friday deals! I saved so much on top-quality products. Highly recommend checking it out!',
              handle: '@john_smith',
              imageSrc: 'https://picsum.photos/id/64/100/100',
            },
            {
              name: 'Emily Johnson',
              text: "The best deals I've ever seen! Managed to get everything on my wishlist at a fraction of the price.",
              handle: '@emily_johnson',
              imageSrc: 'https://picsum.photos/id/65/100/100',
            },
            {
              name: 'David Rodriguez',
              text: 'Incredible savings! The analytics tools helped me find the best deals quickly. Highly impressive!',
              handle: '@david_rodriguez',
              imageSrc: 'https://picsum.photos/id/669/100/100',
              featured: true,
            },
            {
              name: 'Mandy',
              text: 'Amazing Black Friday deals!',
              handle: '@mandy',
              imageSrc: 'https://picsum.photos/id/829/100/100',
            },
            {
              name: 'Alex',
              text: 'Found the best deals here! Highly recommend!',
              handle: '@alex',
              imageSrc: 'https://picsum.photos/100/100.webp?random=2',
            },
            {
              name: 'Sam',
              text: 'Extremely satisfied with the Black Friday savings.',
              handle: '@sam',
              imageSrc: 'https://picsum.photos/100/100.webp?random=3',
            },
          ]}
          withBackgroundGlow
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
        description="Find answers to common inquiries about our deal & discount platform:"
        faqItems={[
          {
            question: 'How do I submit a deal?',
            answer: (
              <>
                You can submit a deal by creating a pull request at{' '}
                <a
                  href="https://github.com/danmindru/rare-big-deal/pulls"
                  className="underline"
                >
                  github.com/danmindru/rare-big-deal/pulls
                </a>
                . All submissions are automatically accepted in order of
                submission.
              </>
            ),
          },
          {
            question: 'Where can I see the submitted deals?',
            answer: (
              <>
                All submitted deals are featured on our webpage at{' '}
                <a href="https://rarebigdeal.com" className="underline">
                  rarebigdeal.com
                </a>
                . The submissions will be categorized and displayed
                alphabetically and you'll get a standalone page for your deal.
              </>
            ),
          },
          {
            question: 'Are all deals accepted?',
            answer:
              'Yes, as long as you have a deal, it will be accepted and featured on our webpage.',
          },
          {
            question: 'Is the process automated?',
            answer:
              'Yes, everything is automated after submission. If you need any manual changes, please raise a pull request.',
          },
          {
            question: 'Can I make changes to my submitted deal?',
            answer:
              'Yes, you can make changes by raising a pull request with the necessary modifications.',
          },
          {
            question: 'How are deals ordered?',
            answer:
              'Deals are ordered based on the time of submission on the Github repo, with the latest submissions appearing at the bottom. On the webpage, they ordered b alphabetically and grouped by category.',
          },
          {
            question: 'Is there a limit to the number of deals I can submit?',
            answer:
              'No, there is no limit to the number of deals you can submit.',
          },
          {
            question: 'Do I need coding skills to submit a deal?',
            answer:
              'No, you do not need coding skills. Simply create a pull request with your deal details.',
          },
          {
            question:
              'How long does it take for my deal to appear on the webpage?',
            answer:
              'Deals are processed automatically and should appear on the webpage shortly after submission.',
          },
          {
            question: 'Can I feature my deal at the top of the list?',
            answer: (
              <>
                There is no option to do that currently. Get in touch with us at{' '}
                <a href={metadata.twitter} className="underline">
                  here
                </a>{' '}
                for more information.
              </>
            ),
          },
          {
            question:
              'What information do I need to include in my deal submission?',
            answer:
              'Please take a previous deal as an example and include all the necessary information in your submission. You need a name, short description and a deal text as a minimum.',
          },
          {
            question: 'Can I delete my submitted deal?',
            answer:
              'If you need to delete your submitted deal, please raise a pull request with the request for deletion.',
          },
        ]}
        withBackground
      />
    </div>
  );
}
