import Head from 'next/head'
import Task from '../components/task'
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

export const client = new ApolloClient({
  uri: 'http://dua.kodingus.com/graphql',
  cache: new InMemoryCache()
});

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  const getTasks = async () => {
    let { data, loading, errors } = await client.query({
      query: gql`
        query {
          tasks {
            id,
            title,
            content
          }
        }
      `
    })
    
    setTasks(data.tasks)
  }

  const addTask = async (title, content) => {
    let result = await client.mutate({
      mutation: gql`
        mutation {
          createTask(title: "${title}", content: "${content}") {
            id
          }
        }
      `
    }).then((res) => {
      router.reload()
    })
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="/">Todaw</a>
        </h1>

        <p className="description">
          Stack your Tasks
        </p>

        <div>
          <input className="input-title" type="text" placeholder="Title" onChange={e => setTitle(e.target.value)}/>
          <input className="input-content" type="text" placeholder="Content" onChange={e => setContent(e.target.value)}/>
          <div className="submit-task">
            <center>
            <img className="create-task" src="https://img.icons8.com/bubbles/50/000000/create-new.png" onClick={() => addTask(title, content)}/>
            </center>
          </div>
        </div>

        <div className="grid">
          {tasks.map((task) => <Task key={task.id} task={task}/>)}
        </div>
      </main>

      <footer>
        <a
          href="https://github.com/mojila"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="https://avatars3.githubusercontent.com/u/25322137?s=460&u=f469aabf01f828ec2118a81f693623ec377d4b93&v=4" alt="Mojila Logo" className="logo" /> Mojila
        </a>
      </footer>

      <style jsx>{`
        .submit-task {
          margin-top: 16px;
        }
        
        .input-title {
          padding: 8px;
          border-radius: 4px;
          margin-right: 8px;
        }

        .input-content {
          padding: 8px;
          border-radius: 4px;
          margin-right: 8px;
        }

        .create-task {
          cursor: pointer;
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .logo {
          height: 1em;
          margin-right: 8px;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
