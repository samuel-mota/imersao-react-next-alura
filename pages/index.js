import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import db from '../db.json';
import { motion } from 'framer-motion';

import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import GitHubCorner from '../src/components/GitHubCorner';
import Footer from '../src/components/Footer';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        {/* <Head>
          <title>{db.title}</title>
        </Head> */}
        <QuizContainer>
          <QuizLogo />
          <Widget
            as={motion.section}
            transition={{ delay: 0, duration: .5 }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' }
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <p>{db.description}</p>
              <form onSubmit={(event) => {
                event.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}
              >
                <Input
                  name="nomeDoUsuario"
                  placeholder="Qual seu nome?"
                  type="text"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  value={name}
                />
                <Button type="submit" disabled={name.length === 0}>
                  {`Jogar ${name}`}
                </Button>
              </form>
            </Widget.Content>
          </Widget>

          <Widget
            as={motion.section}
            transition={{ delay: .5, duration: .5 }}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0 }
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Content>
              <h1>Quizes da Galera</h1>

              <ul>
                {db.external.map((linkExterno) => {
                  const [projectName, githubUser] = linkExterno // 'https://imersao-react-next-alura.samuel-mota.vercel.app/'
                    .replace(/\//g, '') // elimina todas as barras = https:imersao-react-next-alura.samuel-mota.vercel.app
                    .replace('https:', '') // imersao-react-next-alura.samuel-mota.vercel.app
                    .replace('.vercel.app', '') // imersao-react-next-alura.samuel-mota
                    .split('.') // ['imersao-react-next-alura', 'samuel-mota']

                  return (
                    <li key={linkExterno}>
                      <Widget.Topic 
                        as={Link}
                        href={`/quiz/${projectName}___${githubUser}`}
                      > {/* href={linkExterno}> */}
                        {`${githubUser} / ${projectName}`}
                      </Widget.Topic>
                    </li>  
                  )
                })}
              </ul>
            </Widget.Content>
          </Widget>
          <Footer 
            as={motion.section}
            transition={{ delay: .5, duration: .5 }}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0 }
            }}
            initial="hidden"
            animate="show"
          />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/samuel-mota" />
      </QuizBackground>
    </>
  );
}
