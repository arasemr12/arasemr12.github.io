import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { Link } from "react-router-dom";

function More() {
  let user = useSelector(state => state.user);
  let repos = user.repos;
  user = user.user;

  return (
    <div onContextMenu={(e) => e.preventDefault()} className="w-full h-full flex flex-col items-center gap-5 p-4">
      <LoadingBar progress={100}/>
        <div className="w-full lg:w-2/3 flex flex-col">
            <span className="text-2xl mb-2">Who I am?</span>
            <span>I am a self-taught web/desktop developer. I am also learning game/os development.</span>
        </div>
        <div className="w-full lg:w-2/3 flex flex-col">
            <span className="text-2xl uppercase mb-2">My skills</span>
            <div className="w-full flex flex-row flex-wrap gap-5">
              <div className="skill">Html</div>
              <div className="skill">Css</div>
              <div className="skill">Javascript</div>
              <div className="skill">Node.JS</div>
              <div className="skill">TypeScript</div>
              <div className="skill">Nuxt.JS</div>
              <div className="skill">React</div>
              <div className="skill">TailwindCSS</div>
              <div className="skill">C++</div>
              <div className="skill">C</div>
            </div>
        </div>
        <div className="w-full lg:w-2/3 flex flex-col">
            <span className="text-2xl mb-4">My open source projects.</span>
            <div className="w-full flex flex-col lg:flex-row flex-wrap gap-5">
                {repos.map((repo) => (
                    <a key={repo.id} href={repo.html_url} target="_blank" className="w-full lg:w-[45%] hover:scale-[1.01] hover:border-[1px] border-gray-600 flex flex-col p-4 rounded-lg bg-gray-800">
                        <span>{repo.name}</span>
                        <span>{repo.description}</span>
                        <div className="w-full flex flex-row items-center gap-2">
                            <span><i className="fa-regular fa-star mr-1"></i>{repo.stargazers_count}</span>
                            <span><i className="fa-solid fa-code-fork mr-1"></i>{repo.forks_count}</span>
                            <span>{repo.language}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
        <Link className="cursor-pointer py-2 px-4 bg-purple-600 hover:bg-purple-800 duration-300 rounded" to="/">Back to home!</Link>
    </div>
  )
}

export default More;
