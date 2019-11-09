import React, {useState} from 'react';
import {Box} from 'ink';
import Spinner from 'ink-spinner';
import fetch from 'node-fetch';
// import styled from 'styled-components'


const url = 'http://localhost:8080/test';

const fetchData = (url) => {
  const fetchedData = fetch(url)
    .then((response) => {
      const { ok, statusText } = response;

      if (!ok) {
        throw new Error(statusText);
      }

      return response.json();
    })
    .catch((error) => {
      throw new Error(error);
    });

  return fetchedData;
};

const Query = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [speed, setSpeed] = useState(0);
  const waitTimeInSeconds = 10;

  fetchData(url)
    .then((payload) => {
      const { speed } = payload;

      setTimeout(() => {
        setSpeed(speed);
      }, 2000);
    })
    .catch((error) => {
      setSpeed(error);
    })
    .finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    });

  return (
    <Box width={10}>
      {isLoading ? (
        <>
          <span>Is loading </span>
          <Spinner type="point"/>
        </>
      ) : (
        <Box>
          Current speed: { speed } KPH
        </Box>
      )}
    </Box>
  )
};

module.exports = Query;
