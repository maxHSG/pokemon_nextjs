import Head from "next/head";
import Image from "next/image";
import { memo, useEffect } from "react";
import { useQuery } from "react-query";
import { getPokemons } from "../api/pokemons";
import { POKEMON_LIST } from "../constants/queryCache";
import {
  faArrowUp,
  faGraduationCap,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage, NextPageContext } from "next";
import mysql from "mysql2/promise";

const config = {
  host: process.env.DB_HOST ?? undefined,
  port: Number(process.env.DB_PORT || 3306),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ?? undefined,
  user: process.env.DB_USER ?? undefined,
};

export async function getServerSideProps(context: NextPageContext) {
  try {
    const db = await mysql.createConnection({ ...config });

    const [rows] = await db.query(`SELECT * FROM users`);

    const data = JSON.parse(JSON.stringify(rows));

    return {
      props: { data }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log("error", error);
  }

  return {
    props: { data: {} }, // will be passed to the page component as props
  };
}

export default function Teste(props: NextPage & { data: object }) {
  return (
    <>
      <div>{JSON.stringify(props.data || "")}</div>
    </>
  );
}
