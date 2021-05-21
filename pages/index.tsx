import Head from "next/head";
import Image from "next/image";
import { memo, useEffect } from "react";
import { useQuery } from "react-query";
import { getPokemons } from "../api/pokemons";
import Layout from "../components/Layout";
import PokemonItem from "../components/PokemonItem";
import { POKEMON_LIST } from "../constants/queryCache";
import {
  faArrowUp,
  faGraduationCap,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { NextPage, NextPageContext } from "next";
config.autoAddCss = false; /* eslint-disable import/first */

interface PokemonItem {}

type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
}
  ? U
  : T;

const IconWeight = memo(() => {
  return <FontAwesomeIcon icon={faWeight} />;
});

interface PokemonListProps {
  data: Await<ReturnType<typeof getPokemons>> | undefined;
}
const PokemonList = ({ data }: PokemonListProps) => {
  const pokemonState = useQuery([POKEMON_LIST], () => getPokemons(), {
    initialData: data,
    enabled: false,
  });

  return (
    <div className="container mx-auto pt-6 mb-6">
      <div className="grid md:grid-cols-4 sm:grid-cols-3 lg:grid-cols-6 gap-10 md:gap-4 ">
        {pokemonState.data?.results.map((item) => {
          return (
            <div
              key={item.id}
              className=" flex flex-col shadow-xl rounded overflow-hidden bg-white transform hover:scale-105 transition-transform "
            >
              <div className="border-b-2 border-gray-200 p-3 flex justify-center ">
                {item.sprites.back_default ? (
                  <Image
                    width={176}
                    height={176}
                    className="w-100 h-60 object-contain  "
                    src={item.sprites.back_default}
                    alt={`Foto do ${item.name}`}
                  />
                ) : null}
              </div>
              <div className="p-3 ">
                <h2 className="text-gray-800 text-1xl font-bold">
                  {item.name}
                </h2>
                <div className="mt-2">
                  <div className="text-sm text-gray-600">
                    <IconWeight />
                    <span className="ml-2">{item.weight} kg</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <FontAwesomeIcon icon={faGraduationCap} />
                    <span className="ml-2">{item.base_experience} xp</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <FontAwesomeIcon icon={faArrowUp} />
                    <span className="ml-2">{item.height} metros</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const data = await getPokemons();

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default function Home(props: NextPage & PokemonListProps) {
  return (
    <>
      <div className="flex justify-center bg-yellow-400 pb-52 pt-10">
        <div className="w-full relative h-24 sm:h-48">
          <Image
            layout="fill"
            objectFit="contain"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
            alt="Logo da pagina do pokemon"
          />
        </div>
      </div>
      <div className="-mt-36">
        <PokemonList data={props.data} />
      </div>
    </>
  );
}
