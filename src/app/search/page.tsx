"use client"

import {findHack} from "@/helpers/score";
import React from "react";
import HackFoundModal from "@/components/HackFoundModal";

export default function SearchPage(): React.ReactNode {
  const bannedWords = ["SELECT", "UPDATE", "DELETE", "INSERT", "ALTER", "CREATE", "DROP"];

  const queryParameters = new URLSearchParams(window.location.search);
  const query = queryParameters.get("query");
  const [isValid, setIsValid] = React.useState(true);

  // Check if the query contains any banned words
  React.useEffect(() => {
    const re = new RegExp(/(;|"|";|'|';).*(((SELECT|UPDATE|DELETE|)\s+([a-zA-Z]|\*)+\s+(FROM|INTO|DATABASE|TABLE|INDEX)\s+)|(INSERT INTO|CREATE DATABASE|ALTER DATABASE|CREATE TABLE|ALTER TABLE|DROP TABLE|CREATE INDEX|DROP INDEX|AND|OR))/);

    if (query && re.exec(query.toUpperCase())) {
      findHack("SQL")
      setIsValid(false);
    }
  }, [query]);

  return (
    <main>
      {isValid ? (
        <p>no results found for: {query}</p>
      ) : (
        <>
          <HackFoundModal title={'SQL Injection Found'}>
            <p className="text-gray-800">
              Looks like we MAY have forgotten to properly sanitise our search bar for any injections, especially as it links directly to our database!<br className={'mb-2'} />
              What you&apos;ve just done is an example of an <strong>SQL Injection Attack</strong>. When creating a website that has user input fields linked to a database, make sure to use prepared statements and/or sanitise ALL inputs. (The <a href={'https://portswigger.net/web-security/sql-injection/cheat-sheet'} className={'underline cursor-pointer text-gray-800 hover:text-gray-500'}>PortSwigger Cheat Sheet</a> has many great examples!)
            </p>
          </HackFoundModal>
          <p>INVALID</p>
        </>
      )}
    </main>
  );
}
