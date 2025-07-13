import axiosConfig from "../lib/axiosConfig";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { queryClient } from "../stores/query";
import { useStore } from "@nanostores/react";
import NumberFlow from "@number-flow/react";

const getViewCount = async (slug: string) => {
  try {
    const response = await axiosConfig.get("api/views/route.json", {
      params: {
        slug,
      },
    });

    return response.data as { count: number };
  } catch (error) {
    throw Error("Failed to get view count");
  }
};

const updateViewCount = async (slug: string) => {
  try {
    const response = await axiosConfig.post("api/views/route.json", {
      slug,
    });

    return response;
  } catch (error) {
    throw Error("Failed to get view count");
  }
};

const Views = ({ slug }: { slug: string }) => {
  const [viewCount, setViewCount] = useState(0);
  const client = useStore(queryClient);

  const { data, isPending, refetch } = useQuery(
    {
      queryKey: ["views", slug],
      queryFn: () => getViewCount(slug),
      refetchOnWindowFocus: "always",
    },
    client
  );

  const { mutate } = useMutation(
    {
      mutationFn: () => updateViewCount(slug),
      onSuccess: data => {
        if (data.status === 201) {
          window.sessionStorage.setItem(slug, "true");
          refetch();
        }
      },
    },
    client
  );

  useEffect(() => {
    const callAPI = setTimeout(() => {
      const alreadyViewed = window.sessionStorage.getItem(slug);

      // storing stuff in sessionStorage & not calling the update count function whenever user visits the page for that session
      // not updating count during development
      if (
        alreadyViewed !== "true" &&
        !window.location.origin.includes("localhost")
      ) {
        mutate();
      }
    }, 10000);

    return () => clearTimeout(callAPI);
  }, [mutate, slug]);

  useEffect(() => {
    if (data?.count) {
      setViewCount(data.count);
    }
  }, [data]);

  return (
    <div
      className="hidden items-center gap-1 md:flex"
      title={`${data?.count} views`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>

      {isPending ? (
        <div className="not-prose flex items-center gap-1">
          <span className="dot size-1 rounded-full bg-text" />
          <span className="dot size-1 rounded-full bg-text" />
          <span className="dot size-1 rounded-full bg-text" />
        </div>
      ) : (
        <NumberFlow
          value={viewCount}
          transformTiming={{
            duration: 2000,
            easing:
              "linear(0 0%,0.004379 1%,0.017027 2%,0.037197 3%,0.064139 4%,0.097098 5%,0.135326 6%,0.178089 7.000000000000001%,0.224667 8%,0.274366 9%,0.326515 10%,0.380476 11%,0.435642 12%,0.491445 13%,0.547353 14.000000000000002%,0.602874 15%,0.65756 16%,0.711 17%,0.76283 18%,0.812725 19%,0.860402 20%,0.90562 21%,0.948177 22%,0.98791 23%,1.024693 24%,1.058435 25%,1.089077 26%,1.116593 27%,1.140987 28.000000000000004%,1.162286 28.999999999999996%,1.180545 30%,1.19584 31%,1.208266 32%,1.217937 33%,1.22498 34%,1.229538 35%,1.231761 36%,1.231811 37%,1.229853 38%,1.226059 39%,1.220603 40%,1.213659 41%,1.205403 42%,1.196006 43%,1.185638 44%,1.174463 45%,1.162638 46%,1.150318 47%,1.137645 48%,1.124757 49%,1.111781 50%,1.098837 51%,1.086034 52%,1.073472 53%,1.061241 54%,1.04942 55.00000000000001%,1.038082 56.00000000000001%,1.027286 56.99999999999999%,1.017084 57.99999999999999%,1.007519 59%,0.998624 60%,0.990425 61%,0.982939 62%,0.976176 63%,0.970139 64%,0.964824 65%,0.960222 66%,0.956318 67%,0.953091 68%,0.950518 69%,0.94857 70%,0.947216 71%,0.946423 72%,0.946154 73%,0.946371 74%,0.947035 75%,0.948105 76%,0.949542 77%,0.951304 78%,0.953352 79%,0.955646 80%,0.958146 81%,0.960816 82%,0.963619 83%,0.966522 84%,0.96949 85%,0.972494 86%,0.975505 87%,0.978496 88%,0.981443 89%,0.984323 90%,0.987118 91%,0.989809 92%,0.992382 93%,0.994822 94%,0.99712 95%,0.999265 96%,1.001252 97%,1.003076 98%,1.004733 99%,1.006221 100%)",
          }}
          format={{ notation: "compact" }} // Intl.NumberFormat options
          locales="en-US" // Intl.NumberFormat locales
          trend="increasing"
        />
      )}
    </div>
  );
};

export default Views;
