import { useEffect } from "react"
import { useRouter } from 'next/router'
import { client } from "../pages"
import { gql } from '@apollo/client';


export default function Task({ task }) {
  const router = useRouter()

  const deleteTask = async (id) => {
    await client.mutate({
      mutation: gql`
        mutation {
          deleteTask(id: "${id}") {
            id
          }
        }
      `
    }).then((res) => {
      router.reload()
    })
  }

  return <React.Fragment>
    <div className="card">
      <div className="todo-title">
        <div className="todo-title-text">
          <h3>{task.title}</h3>
        </div>
        <div>
          <img src="/trash.svg" className="delete" onClick={() => deleteTask(task.id)}/>
        </div>
      </div>
      <p>{task.content}</p>
    </div>
    <style jsx>{`
      .todo-title-text {
        margin-right: 32px;
      }

      .todo-title {
        display: flex;
        justify-content: 'space-between';
      }

      .delete {
        width: 32px;
        cursor: pointer;
      }

      .card {
        margin: 1rem;
        flex-basis: 45%;
        padding: 1.5rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        transition: color 0.15s ease, border-color 0.15s ease;
      }

      .card:hover,
      .card:focus,
      .card:active {
        color: #0070f3;
        border-color: #0070f3;
      }

      .card h3 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
      }

      .card p {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.5;
      }
    `}</style>
  </React.Fragment>
}