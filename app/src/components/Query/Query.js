import React, {useState, useEffect} from 'react';
import {Box} from 'ink';
import Spinner from 'ink-spinner';
import fetch from 'node-fetch';
import {Observable} from 'rxjs';
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

const Query = () => {
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

module.exports = Query;
