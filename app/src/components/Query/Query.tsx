import React, {useState, useEffect, ReactElement} from 'react';
// @ts-ignore
import {Box} from 'ink';
// @ts-ignore
import Spinner from 'ink-spinner';
// @ts-ignore
import fetch from 'node-fetch';
// @ts-ignore
import {Observable} from 'rxjs';
// @ts-ignore
import {repeat, delay} from 'rxjs/operators';

const url = 'http://localhost:8080/test';

const fetchObservable = Observable.create((observer) => {
  fetch(url)
    .then((response) => {
      const { ok, statusText } = response;

      if (!ok) {
        throw new Error(statusText);
      }

      return response.json();
    })
    .then((payload) => {
      observer.next(payload);
      observer.complete();
    })
    .catch(error => observer.error(error));
}).pipe(delay(2000));

const Query = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(true);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const subscribeToApi = fetchObservable
      .pipe(repeat())
      .subscribe((payload) => {
        const { speed } = payload;

        setSpeed(speed);
        setIsLoading(false);
      });

    return () => {
      subscribeToApi.unsubscribe();
    };
  }, []);

  return (
    <Box width={10}>
      {isLoading ? (
        <>
          <span>Is loading </span>
          <Spinner type="point"/>
        </>
      ) : (
        <Box>
          Current speed: { speed } KPH (dummy)
        </Box>
      )}
    </Box>
  )
};

export default Query;
