import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Link,
  ListItem,
  OrderedList,
  VStack,
  Card,
  CardHeader,
  CardBody,
  Button,
  HStack,
} from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";

const WAPrivacyPolicy = () => {
  return (
    <Container maxW="5xl" py={8}>
      <VStack spacing={8} align="stretch">
        <VStack align="start" spacing={2}>
          <Heading size="xl">Privacy Policies</Heading>
          <Text color="gray.500">Last updated: June 2, 2024</Text>
        </VStack>

        <Card>
          <CardHeader>
            <HStack justify="space-between">
              <Heading size="md">WeakAura Saver Chrome Extension</Heading>
              <Button
                size="sm"
                rightIcon={<ExternalLink size={16} />}
                as="a"
                href="https://chromewebstore.google.com/detail/jddhepnflgpcdmcmodhceabhjkbpicef"
                target="_blank"
              >
                Download
              </Button>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Text>
                Thank you for using the WeakAura Saver Chrome Extension ("the
                Extension"). Your privacy is of utmost importance to us. This
                privacy policy outlines the type of information the Extension
                does not collect, share, or store, and explains the measures we
                take to ensure your data remains private.
              </Text>

              <Box>
                <Heading as="h3" size="md" mb={3}>
                  No Data Collection
                </Heading>
                <Text mb={3}>
                  The Extension is designed to assist users in saving WeakAura
                  strings from the Wago.io website to a local text file. We want
                  to be clear that:
                </Text>
                <OrderedList spacing={2}>
                  <ListItem>
                    <Text>
                      No Personal Data Collection: The Extension does not
                      collect any personal data or any other information from
                      you.
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                      No Usage Data Collection: The Extension does not track or
                      collect usage data or any other metrics.
                    </Text>
                  </ListItem>
                </OrderedList>
              </Box>

              <Box>
                <Heading as="h3" size="md" mb={3}>
                  No Data Sharing
                </Heading>
                <Text mb={3}>We do not share any data for any reason:</Text>
                <OrderedList spacing={2}>
                  <ListItem>
                    <Text>
                      No Data Sharing with Third Parties: Since the Extension
                      does not collect any data, it follows that we do not share
                      any data with third parties.
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                      No Data Sharing for Advertising: We do not collect or
                      share data for advertising purposes.
                    </Text>
                  </ListItem>
                </OrderedList>
              </Box>

              <Box>
                <Heading as="h3" size="md" mb={3}>
                  No Data Storage
                </Heading>
                <Text mb={3}>The Extension does not store any data:</Text>
                <OrderedList spacing={2}>
                  <ListItem>
                    <Text>
                      Local Storage Only: Any data generated by the Extension
                      (such as WeakAura strings) is only stored locally on your
                      device in the form of a text file that you save. This data
                      is never transmitted over the internet.
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                      No Cloud Storage: The Extension does not use any form of
                      cloud storage or online databases to store data.
                    </Text>
                  </ListItem>
                </OrderedList>
              </Box>

              <Box>
                <Heading as="h3" size="md" mb={3}>
                  How the Extension Works
                </Heading>
                <Text mb={3}>
                  The Extension performs the following functions:
                </Text>
                <OrderedList spacing={2}>
                  <ListItem>
                    <Text>
                      Clipboard Access: The Extension reads the clipboard
                      content only when you initiate a save action. This content
                      is used solely for the purpose of saving it to a text
                      file.
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                      File Saving: The Extension uses the File System Access API
                      to allow you to save the clipboard content to a text file
                      on your local device. This process is entirely managed
                      locally and no data is sent over the internet.
                    </Text>
                  </ListItem>
                </OrderedList>
              </Box>

              <Box>
                <Heading as="h3" size="md" mb={3}>
                  Changes to This Privacy Policy
                </Heading>
                <Text>
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page.
                </Text>
              </Box>

              <Box>
                <Heading as="h3" size="md" mb={3}>
                  Contact Us
                </Heading>
                <Text>
                  If you have any questions about this Privacy Policy, please
                  contact us at{" "}
                  <Link href="mailto:emesinternet@gmail.com" color="blue.400">
                    emesinternet@gmail.com
                  </Link>
                  .
                </Text>
              </Box>

              <Text color="gray.500">
                By using the Extension, you agree to the terms outlined in this
                privacy policy. Thank you for trusting WeakAura Saver with your
                data privacy.
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

export default WAPrivacyPolicy;
