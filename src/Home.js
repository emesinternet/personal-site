import {
  VStack,
  Heading,
  Text,
  Image,
  ListItem,
  List,
  Center,
  Link,
} from "@chakra-ui/react";
import Marc from "./assets/marc.jpg";

const Links = ({ children, href, ...props }) => {
  return (
    <Link
      href={href}
      isExternal
      textDecor={"underline"}
      _hover={{ color: "gray.50" }}
      {...props}
    >
      {children}
    </Link>
  );
};

const ParaText = ({ children, ...props }) => {
  return (
    <Text color="gray.400" lineHeight={1.7} {...props}>
      {children}
    </Text>
  );
};

function Home() {
  return (
    <Center p={8}>
      <VStack maxW="1000px" alignItems={"flex-start"} spacing={12}>
        <VStack alignItems={"flex-start"}>
          <Image
            borderRadius="full"
            boxSize="120px"
            src={Marc}
            alt="Marc"
            mb={4}
          />
          <Heading as="h1" size="lg">
            Hey there, Marc here 👋
          </Heading>
          <VStack alignItems={"flex-start"} pt={2} spacing={3}>
            <ParaText>
              You might know me as{" "}
              <Links href="https://twitter.com/marcfromrivr">
                @MarcFromRivr
              </Links>
              , which is totally cool, I dig it. Otherwise, welcome weary
              traveler.
            </ParaText>
            <ParaText>
              I spent the bulk of my professional life as a self-taught game
              developer, dabbling in various titles across PC, console, and
              mobile as a gameplay designer, product manager, QA lead, and
              overall morale maintainer.
            </ParaText>
            <ParaText>
              Like many who exit games, I still love games but can't imagine
              diving back into development. I had a pretty rough experience the
              first go-around, as documented by{" "}
              <Links href="https://kotaku.com/investigation-a-video-game-studio-from-hell-511872642">
                Kotaku
              </Links>
              .
            </ParaText>
            <ParaText>
              I've always been into design—graphic, visual, experience, web, you
              name it. Likewise, I have always been a techie, it kind of{" "}
              <Links href="https://twitter.com/jonathansinger">
                runs in my family
              </Links>
              . Being a tech generalist is a mixed bag professionally. Unless
              you're at the top, companies usually look for specialists since
              there's no shortage of "idea guys." However, I believe my ability
              to think from technical, business, and product perspectives
              simultaneously makes me an effective product manager. Anyhow, I
              don't have to think about that too much anymore because I have my{" "}
              <Links href="https://botni.vision">own company</Links>.
            </ParaText>
            <ParaText>
              Now, I'm the co-founder and CXO (Chief Xperience Officer) of{" "}
              <Links href="https://botni.vision">Botni.Vision</Links>, and more
              specifically, I manage the design, development, and public facing
              aspects of <Links href="https://rivr.stream">Rivr</Links>.
            </ParaText>
            <ParaText
              fontSize="xl"
              color="gray.300"
              fontWeight="semibold"
              lineHeight="1.4"
            >
              My mission is to empower creators, streamers, and content authors
              to unleash their full potential through cutting-edge media
              understanding tools. 🚀
            </ParaText>
          </VStack>
        </VStack>
        <VStack align="start" spacing={3}>
          <Heading as="h2" size="lg">
            Where I've Been
          </Heading>
          <ParaText>
            I've worked in several industries, and am proud of the what I've
            accomplished in each, even if it's not Forbes 30-under-30 level
            stuff. We do the best we can as we move through life, and learn what
            we can from those around us.
          </ParaText>
          <List spacing={3} pt={2}>
            <ListItem
              fontSize={"lg"}
              fontWeight={"semibold"}
              borderWidth={1}
              borderRadius={"md"}
              p={6}
              bg={"whiteAlpha.50"}
            >
              Co-founder / Chief Xperience Officer
              <Text
                fontSize="sm"
                fontWeight={"semibold"}
                color={"gray.500"}
                py={2}
              >
                Botni.Vision, Inc. — 2020 - Now
              </Text>
              <Text
                fontSize="md"
                fontWeight={"normal"}
                color={"gray.400"}
                pt={2}
              >
                Designing and building the next generation of media
                understanding applications and services. Check out{" "}
                <Links href="https://rivr.stream">Rivr</Links> to see where
                thats at.
              </Text>
            </ListItem>
            <ListItem
              fontSize={"lg"}
              fontWeight={"semibold"}
              borderWidth={1}
              borderRadius={"md"}
              p={6}
              bg={"whiteAlpha.50"}
            >
              Artist Manager / Multimedia Designer
              <Text
                fontSize="sm"
                fontWeight={"semibold"}
                color={"gray.500"}
                py={2}
              >
                Freelance — 2014 - 2020
              </Text>
              <ParaText
                fontSize="md"
                fontWeight={"normal"}
                color={"gray.400"}
                pt={2}
              >
                When I moved to Los Angeles in 2014, I wanted to apply my
                project management and design skills to something outside of
                gaming. At first, I was designing website and cover art for
                mostly EDM artists, but then I picked up artist management and
                started managing several Dubstep DJs. This was an incredible
                experience and taught me so much amount about the music
                industry, rights, royalties, touring, events, and so much more.
                I am forever grateful for the experience and to the guys who let
                me do my best to lead them forward. I even had Diplo and
                Skrillex at my house for a party once! That was pretty neat.
              </ParaText>
              <ParaText
                fontSize="sm"
                fontWeight={"normal"}
                color={"gray.500"}
                pt={4}
              >
                Special thanks to: 2TD, Volt, Ryan Browne, Danny Johnson, Max
                Mayeri, and Henry Lu.
              </ParaText>
            </ListItem>
            <ListItem
              fontSize={"lg"}
              fontWeight={"semibold"}
              borderWidth={1}
              borderRadius={"md"}
              p={6}
              bg={"whiteAlpha.50"}
            >
              A&R / Multimedia Designer
              <Text
                fontSize="sm"
                fontWeight={"semibold"}
                color={"gray.500"}
                py={2}
              >
                Buygore Records — 2015 - 2017
              </Text>
              <ParaText
                fontSize="md"
                fontWeight={"normal"}
                color={"gray.400"}
                pt={2}
              >
                Despite having worked in games for years, I found myself back at
                the intern level in the music industry. Getting your foot in the
                door is always the hardest part, and people who put their nose
                up at opportunities to do so are the worst kind. After spending
                some time designing cover art for soon to be released records, I
                earned the trust of the label head to start vetting and
                submitting demos that I thought were really promising. This
                unlocked a whole world of opportunities for me in the EDM scene
                that pushed me into artist management.
              </ParaText>
              <ParaText
                fontSize="sm"
                fontWeight={"normal"}
                color={"gray.500"}
                pt={4}
              >
                Special thanks to: Asaf Borger, Steven Pahel, Christina Discon,
                and Nappy.
              </ParaText>
            </ListItem>
            <ListItem
              fontSize={"lg"}
              fontWeight={"semibold"}
              borderWidth={1}
              borderRadius={"md"}
              p={6}
              bg={"whiteAlpha.50"}
            >
              Creative Producer
              <Text
                fontSize="sm"
                fontWeight={"semibold"}
                color={"gray.500"}
                py={2}
              >
                Trendy Entertainment, LLC (Chormatic Games) — 2014 - 2015
              </Text>
              <ParaText
                fontSize="md"
                fontWeight={"normal"}
                color={"gray.400"}
                pt={2}
              >
                After the indie success of Dungeon Defenders, I was called up to
                help complete and release a new version of Dungeon Defenders on
                a very short timeline, with a team of more junior developers..
                Despite having had a poor experience at Trendy, I took on the
                job as a contract with no intention of returning to the company.
                I loved the game so much and knew it so well that I wanted to
                try and keep the magic of Dungeon Defenders going. I did the
                best that I could while fighting back against shareholder and
                publisher interest that led to initial poor reviews.
              </ParaText>
            </ListItem>
            <ListItem
              fontSize={"lg"}
              fontWeight={"semibold"}
              borderWidth={1}
              borderRadius={"md"}
              p={6}
              bg={"whiteAlpha.50"}
            >
              Product Manager (NA/EU)
              <Text
                fontSize="sm"
                fontWeight={"semibold"}
                color={"gray.500"}
                py={2}
              >
                Nival — 2013 - 2014
              </Text>
              <ParaText
                fontSize="md"
                fontWeight={"normal"}
                color={"gray.400"}
                pt={2}
              >
                Short lived but interesting experience working for a Russian
                company as one of the only Americans. My emails were in Russian,
                calls were in Russian, and I was setup with a Russian language
                teacher to do the best that I could. I even took a trip to
                Moscow and St. Petersberg to meet the team. My job was to take
                their games and port them over to North American and European
                audiences. The main game I worked on was called Prime World,
                which had some really great city building RPG elements, but the
                session based MOBA gameplay was just not better than DotA or
                League, so it did not do particularly well.
              </ParaText>
            </ListItem>
            <ListItem
              fontSize={"lg"}
              fontWeight={"semibold"}
              borderWidth={1}
              borderRadius={"md"}
              p={6}
              bg={"whiteAlpha.50"}
            >
              Lead Gameplay Designer / Gameplay Producer
              <Text
                fontSize="sm"
                fontWeight={"semibold"}
                color={"gray.500"}
                py={2}
              >
                Trendy Entertainment, LLC (Chromatic Games) — 2010 - 2013
              </Text>
              <ParaText
                fontSize="md"
                fontWeight={"normal"}
                color={"gray.400"}
                pt={2}
              >
                Played a major role in the success of Dungeon Defenders for
                XBLA, PSN, and PC. My job was to design and see through
                production nearly all aspects of gameplay. I worked closely with
                every department, often working outside my responsibilities,
                Trendy was a start-up at the time after all. I learned Unreal
                Engine from nothing, built a QA team, designed and balanced my
                ass off, did voice overs, made trailers, and spent many nights
                sleeping under my desk. The head of the company was verbally
                abusive, my job was constantly threatened, and over time the
                truth of how things went down were revealed in a Kotaku article
                calling it "The Video Game Studio from Hell".
              </ParaText>
            </ListItem>
            <ListItem
              fontSize={"lg"}
              fontWeight={"semibold"}
              borderWidth={1}
              borderRadius={"md"}
              p={6}
              bg={"whiteAlpha.50"}
            >
              Web Master / Technical Designer
              <Text
                fontSize="sm"
                fontWeight={"semibold"}
                color={"gray.500"}
                py={2}
              >
                University of Florida — 2009 - 2010
              </Text>
              <ParaText
                fontSize="md"
                fontWeight={"normal"}
                color={"gray.400"}
                pt={2}
              >
                Kind of a weird one, mainly because I did not go to the
                University of Florida. As a matter of fact, I was probably the
                only person who worked at the Department of Chemistry that did
                not have a college degree. Nevertheless, they needed a techie,
                and I needed a job. I maintained intranets, websites, and
                publication libraries. Honestly was pretty neat but not
                satisfying by any means.
              </ParaText>
            </ListItem>
            <ListItem
              fontSize={"lg"}
              fontWeight={"semibold"}
              borderWidth={1}
              borderRadius={"md"}
              p={6}
              bg={"whiteAlpha.50"}
            >
              Computer Technician / Event Coordinator
              <Text
                fontSize="sm"
                fontWeight={"semibold"}
                color={"gray.500"}
                py={2}
              >
                Nexus Gaming Center — 2008 - 2009
              </Text>
              <ParaText
                fontSize="md"
                fontWeight={"normal"}
                color={"gray.400"}
                pt={2}
              >
                My first tech job was working in a LAN center / Arcade. As a
                teenager, this was a pretty sweet job. Unlimited supply of
                energy drinks, free games, and building/repairing computers for
                minimum wage. I honestly didn't even care about the money at the
                time, it was just a great place to be with an amazing community.
                It wasn't all fun and games though! I did get to spend some time
                creating custom World of Warcraft servers and scripting boss
                fights for internal events. Having this specific experience
                really put me on track to get my first game jobs.
              </ParaText>
            </ListItem>
          </List>
        </VStack>
        <Text pb={4}>Well, that's basically it. Cya 👋</Text>
      </VStack>
    </Center>
  );
}

export default Home;
