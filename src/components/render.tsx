import React from "react";

type Props = {
  render: React.ReactNode,
  fetched: boolean,
  loading: boolean,
  access?: boolean,
  renderSkeleton?: React.ReactNode
}

export const Render = ({ render, fetched, access, loading, renderSkeleton }: Props) => {

  return ( 
    <React.Fragment>
      
      {(loading && !fetched) && renderSkeleton}

      {fetched && (
        <React.Fragment>
          {access && (
            <React.Fragment>
              {render}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      
    </React.Fragment>
  );
}