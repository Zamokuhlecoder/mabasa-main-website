/**
 * Leadership shown on the About page.
 *
 * `name` is left empty until the person's full name is supplied - cards then show the
 * role only, and no named Person is added to the site's search data. `bio` is optional.
 */
export type TeamMember = {
  role: string;
  image: string;
  /** Published as a founder (vs. a team member) in the site's search data. */
  founder?: boolean;
  name?: string;
  /** Also-known-as name, published in search data only. */
  alias?: string;
  bio?: string;
  /** Vertical focus when the photo is cropped, e.g. "50% 30%". */
  focus?: string;
};

export const team: TeamMember[] = [
  {
    name: "Lethabo Scofield",
    founder: true,
    role: "Founder & Chief Executive Officer",
    image: "/team/ceo.webp",
    focus: "50% 40%",
  },
  {
    name: "Alisha Fatima",
    role: "Head of Engineering & Delivery",
    image: "/team/head-of-engineering.webp",
    focus: "50% 30%",
  },
  { name: "Zamokuhle Mazibuko", role: "Chief Technology Officer", image: "/team/cto.webp", focus: "50% 25%" },
  { name: "Tshiamiso Moeng", role: "Chief Financial Officer", image: "/team/cfo.webp", focus: "50% 25%" },
];
