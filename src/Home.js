import React from "react";
import {
  Box,
  Container,
  Text,
  Image,
  HStack,
  IconButton,
  useColorMode,
  Link,
  Collapse,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import {
  Sun,
  Moon,
  Twitter,
  Twitch,
  Linkedin,
  Mail,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Marc from "./assets/marc.jpg";

const workExperiences = [
  {
    title: "Co-founder / Chief Xperience Officer",
    timeframe: "Botni.Vision, Inc. — 2020 - 202X — Montreal, QC",
    description: (
      <>
        After reconnecting with my best friend Brandon, who's now our CEO, we
        started working on a solution to reduce the time needed to find the most
        valuable parts of long-form video. In doing so, we ended up building a
        media understanding engine that goes well beyond just getting cool
        clips. Creators and organizations can now search through video to find
        anything they need, quickly and cost-effectively. Now I'm designing and
        building the next generation of media understanding applications and
        services. Check out{" "}
        <Link href="https://rivr.stream" color="accent.400">
          Rivr
        </Link>{" "}
        to see where that's at.
      </>
    ),
  },
  {
    title: "Artist Manager / Multimedia Designer",
    timeframe: "Freelance — 2014 - 2020 — Los Angeles, CA",
    description:
      "When I moved to Los Angeles in 2014, I wanted to apply my project management and design skills to something outside of gaming. At first, I was designing websites and cover art for mostly EDM artists, but then I picked up artist management and started managing several Dubstep DJs. This was an incredible experience that taught me so much about the music industry: rights, royalties, touring, events, and more. I'm forever grateful for the experience and to the guys who let me do my best to lead them forward. I even had Diplo and Skrillex at my house for a party once! That was pretty neat.",
    specialThanks:
      "Special thanks to: 2TD, Volt, Ryan Browne, Danny Johnson, Max Mayeri, and Henry Lu.",
  },
  {
    title: "A&R / Multimedia Designer",
    timeframe: "Buygore Records — 2015 - 2017 — Los Angeles, CA",
    description:
      "Despite having worked in games for years, I found myself back at the intern level in the music industry. Getting your foot in the door is always the hardest part, and people who stick their nose up at opportunities like these are the worst. After spending some time designing cover art for upcoming releases, I earned the trust of the label head to start vetting and submitting demos that I thought were promising. This unlocked a whole world of opportunities for me in the EDM scene that pushed me into artist management.",
    specialThanks:
      "Special thanks to: Asaf Borger, Steven Pahel, Christina Discon, and Nappy.",
  },
  {
    title: "Creative Producer",
    timeframe:
      "Trendy Entertainment, LLC (Chromatic Games) — 2014 - 2015 — Gainesville, FL",
    description:
      "After the indie success of Dungeon Defenders, I was called in to help complete and release a new version on a very short timeline with a team of mostly junior developers. Despite my poor experience at Trendy, I took on the job as a contractor with no intention of returning to the company. I loved the game so much and knew it so well that I wanted to try and keep the magic of Dungeon Defenders going. I did my best while pushing back against shareholder and publisher interests that led to initial poor reviews.",
  },
  {
    title: "Product Manager (NA/EU)",
    timeframe: "Nival — 2013 - 2014 — Miami, FL",
    description:
      "This was a short but interesting experience working for a Russian company as one of the only Americans. My emails were in Russian, calls were in Russian, and they even set me up with a Russian language teacher. I took a trip to Moscow and St. Petersburg to meet the team. My job was to help bring their games to North American and European audiences. The main game I worked on was Prime World, which had some great city-building RPG elements, but the session-based MOBA gameplay just couldn't compete with DotA or League, so it didn't do particularly well.",
  },
  {
    title: "Lead Gameplay Designer / Gameplay Producer",
    timeframe:
      "Trendy Entertainment, LLC (Chromatic Games) — 2010 - 2013 — Gainesville, FL",
    description:
      "I played a major role in the success of Dungeon Defenders for XBLA, PSN, and PC. My job was to design and oversee production of nearly all gameplay aspects. I worked closely with every department, often outside my responsibilities - Trendy was a startup after all. I learned Unreal Engine from scratch, built a QA team, designed and balanced gameplay, did voice-overs, made trailers, and spent many nights sleeping under my desk. The head of the company was verbally abusive, my job was constantly threatened, and eventually the truth came out in a Kotaku article calling it 'The Video Game Studio from Hell.'",
  },
  {
    title: "Web Master / Technical Designer",
    timeframe: "University of Florida — 2009 - 2010 — Gainesville, FL",
    description:
      "This was kind of a weird one, mainly because I didn't go to the University of Florida. Actually, I was probably the only person working at the Department of Chemistry without a college degree. Nevertheless, they needed a techie, and I needed a job. I maintained intranets, websites, and publication libraries. It was pretty neat but not particularly satisfying.",
  },
  {
    title: "Computer Technician / Event Coordinator",
    timeframe: "Nexus Gaming Center — 2008 - 2009 — Boynton Beach, FL",
    description:
      "My first tech job was at a LAN center / Arcade. As a teenager, this was a pretty sweet gig - unlimited energy drinks, free games, and building/repairing computers for minimum wage. I honestly didn't even care about the money; it was just a great place with an amazing community. It wasn't all fun and games though! I got to create custom World of Warcraft servers and script boss fights for internal events. That specific experience really helped me land my first game industry jobs.",
  },
];

const SocialIcon = ({ icon: Icon, href, label }) => (
  <IconButton
    as={Link}
    href={href}
    isExternal
    aria-label={label}
    icon={<Icon size={16} />}
    variant="ghost"
    size="sm"
    borderRadius={"full"}
  />
);

const ExperienceItem = ({ title, timeframe, description, specialThanks }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      w="full"
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
      _hover={{ bg: "whiteAlpha.50" }}
      transition="all 0.2s"
    >
      <Flex
        justify="space-between"
        onClick={onToggle}
        cursor="pointer"
        align={"center"}
        w="full"
        px={4}
      >
        <Box py={8}>
          <Text fontFamily="mono" fontSize="xl" letterSpacing="-0.02em">
            {title}
          </Text>
          <Text fontSize="sm" color="gray.500" mt={2}>
            {timeframe}
          </Text>
        </Box>
        <IconButton
          icon={isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          variant="unstyled"
          size="sm"
          aria-label="Toggle details"
        />
      </Flex>
      <Collapse in={isOpen}>
        <Box px={4} pb={8}>
          <Text fontSize="md" lineHeight="tall" sx={{ textWrap: "pretty" }}>
            {description}
          </Text>
          {specialThanks && (
            <Text
              fontSize="sm"
              color="gray.500"
              mt={6}
              sx={{ textWrap: "pretty" }}
            >
              {specialThanks}
            </Text>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box minH="100vh" py={12}>
      <Container maxW="8xl" pb={6}>
        <Flex direction="column" gap={20}>
          <Flex
            justify="space-between"
            align="center"
            columnGap={8}
            rowGap={4}
            wrap={"wrap-reverse"}
            height={0}
            mt={48}
            mb={-32}
            alignItems={"start"}
          >
            <HStack spacing={5} mx={4}>
              <Image borderRadius="full" boxSize="4rem" src={Marc} alt="Marc" />
              <Text
                fontFamily="mono"
                fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
              >
                Marc Singer
              </Text>
            </HStack>
            <HStack spacing={1} ml={4} justify={"end"} flexDir={"column"}>
              <IconButton
                icon={
                  colorMode === "dark" ? <Sun size={16} /> : <Moon size={16} />
                }
                onClick={toggleColorMode}
                variant="ghost"
                size="sm"
                aria-label="Toggle color mode"
                borderRadius={"full"}
              />
              <SocialIcon
                icon={Twitter}
                href="https://twitter.com/marcfromrivr"
                label="Twitter"
              />
              <SocialIcon
                icon={Twitch}
                href="https://twitch.tv/marcfromrivr"
                label="Twitch"
              />
              <SocialIcon
                icon={Linkedin}
                href="https://www.linkedin.com/in/msinger1/"
                label="LinkedIn"
              />
              <SocialIcon
                icon={Mail}
                href="mailto:marc@rivr.stream"
                label="Email"
              />
            </HStack>
          </Flex>

          <Box px={4}>
            <Text
              fontFamily="mono"
              fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
              fontWeight="bold"
              letterSpacing="tight"
              lineHeight="1.2"
              sx={{ textWrap: "balance" }}
              mr={4}
            >
              Co-founder and Chief Experience Officer at{" "}
              <Link href="https://rivr.stream" isExternal color="accent.400">
                Rivr
              </Link>
              , building the next generation of media understanding tools.
            </Text>
          </Box>

          <Box w="full">
            <Text
              fontFamily="mono"
              fontSize="sm"
              color="gray.500"
              mb={10}
              textTransform="uppercase"
              letterSpacing="wider"
              px={4}
            >
              Experience
            </Text>
            {workExperiences.map((experience, index) => (
              <ExperienceItem key={index} {...experience} />
            ))}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default Home;
