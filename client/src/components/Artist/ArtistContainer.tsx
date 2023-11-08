import { css } from "@emotion/css";
import React from "react";
import { Outlet, useParams } from "react-router-dom";
import ArtistHeaderSection from "../common/ArtistHeaderSection";
import { useTranslation } from "react-i18next";
import { useArtistContext } from "state/ArtistContext";
import { ArtistPageWrapper } from "components/ManageArtist/ManageArtistContainer";

const ArtistContainer: React.FC<{}> = () => {
  const { t } = useTranslation("translation", { keyPrefix: "manageArtist" });

  const { trackGroupId } = useParams();
  const {
    state: { artist },
  } = useArtistContext();

  const artistBanner = artist?.banner?.sizes;

  if (!artist) {
    return null;
  }

  return (
    <>
      {!trackGroupId && (
        <>
          <ArtistPageWrapper artistBanner={!!artistBanner}>
            <ArtistHeaderSection artist={artist} />

            {!artist.enabled && (
              <div
                className={css`
                  background-color: var(--mi-warning-background-color);
                  padding: 1rem;
                  color: var(--mi-warning-text-color);
                `}
              >
                {t("notEnabled")}
              </div>
            )}
            <Outlet />
          </ArtistPageWrapper>
        </>
      )}
      {trackGroupId && <Outlet />}
    </>
  );
};

export default ArtistContainer;
