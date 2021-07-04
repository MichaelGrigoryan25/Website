import axios from "axios";
import splitbee from "@splitbee/web";
import { chakra } from "@chakra-ui/system";
import { Center } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/spinner";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";

import timeline from "../data/timeline";
import Project from "../components/Project";
import TimelineElement from "../components/Timeline/Element";

const Home = () => {
  const [repos, setRepos] = useState([]);
  const [fetchingRepos, setFetchingRepos] = useState(true);

  useEffect(() => {
    splitbee.track("Homepage");

    const fetchRepos = async () => {
      const { data } = await axios.get(
        "https://api.github.com/users/michaelgrigoryan25/repos"
      );
      setRepos(data);
      setFetchingRepos(false);
    };

    fetchRepos();
    return () => {};
  }, []);

  return (
    <Box>
      <Stack mt={5} spacing={10}>
        <Box>
          <Stack spacing={2}>
            <Center>
              <Avatar
                size={"xl"}
                src={"https://avatars.githubusercontent.com/u/56165400?v=4"}
                name={"Michael Grigoryan"}
              />
            </Center>

            <Center>
              <Text fontWeight={"bold"} fontSize={["xl", "2xl", "3xl"]}>
                Hey, I'm Michael! 👋
              </Text>
            </Center>

            <Center>
              <Text
                fontWeight={"semibold"}
                fontSize={["lg", "xl"]}
                align={"center"}
              >
                I'm an enthusiastic high school student that likes to create
                things
              </Text>
            </Center>
          </Stack>
        </Box>

        <Center>
          <Box>
            <Text fontSize={["xl", "2xl", "3xl"]} fontWeight={"bold"}>
              My works ✏
            </Text>

            <Box>
              <Stack spacing={2} my={3}>
                {fetchingRepos ? (
                  <Center>
                    <Spinner />
                  </Center>
                ) : (
                  repos
                    ?.filter((repo) => {
                      return repo.stargazers_count > 1;
                    })
                    ?.sort((a, b) => {
                      return b.stargazers_count - a.stargazers_count;
                    })
                    ?.map((repo, index) => {
                      return (
                        <Project
                          key={repo.id}
                          name={repo.name}
                          url={repo.html_url}
                          popular={index === 0}
                          language={repo.language}
                          description={repo.description}
                        />
                      );
                    })
                )}
              </Stack>
              <Text fontSize={"xs"}>
                Find more on{" "}
                <chakra.a
                  rel={"noopener"}
                  target={"_blank"}
                  fontWeight={"bold"}
                  referrerPolicy={"no-referrer"}
                  transition={"150ms ease-in-out"}
                  _hover={{
                    color: useColorModeValue("blue.500", "blue.300"),
                  }}
                  href={"https://github.com/michaelgrigoryan25"}
                >
                  GitHub ➝
                </chakra.a>
              </Text>
            </Box>
          </Box>
        </Center>

        <Center>
          <Box w={[null, "xl"]} p={[2, 3, 5]}>
            <Text fontSize={["xl", "2xl", "3xl"]} fontWeight={"bold"}>
              Timeline ⏲
            </Text>
            <Text
              fontStyle={"italic"}
              fontSize={["md", "lg"]}
              fontWeight={"semibold"}
            >
              In 2017, 2018 and 2019 I have attended hackathons organized by
              Microsoft
            </Text>

            <Stack
              mt={3}
              spacing={3}
              fontWeight={"semibold"}
              fontSize={["sm", "md"]}
            >
              {timeline.map((data, index) => {
                return <TimelineElement key={index} data={data} />;
              })}
            </Stack>
          </Box>
        </Center>
      </Stack>
    </Box>
  );
};

export default Home;
