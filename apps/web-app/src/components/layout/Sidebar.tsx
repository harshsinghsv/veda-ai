"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

interface NavItem {
  icon: (props: { color: string; opacity: number }) => React.ReactNode;
  label: string;
  href: string;
  badge?: number;
}

const HomeIcon = ({ color, opacity }: { color: string; opacity: number }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 11.6667H11.6667V17.5H17.5V11.6667Z" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.33333 11.6667H2.5V17.5H8.33333V11.6667Z" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 2.5H11.6667V8.33333H17.5V2.5Z" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.33333 2.5H2.5V8.33333H8.33333V2.5Z" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GroupsIcon = ({ color, opacity }: { color: string; opacity: number }) => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.0053 0C19.1069 0 20 0.867353 20 1.93727V12.0627C20 12.8063 19.5687 13.452 18.9357 13.7767C18.7114 13.0842 18.552 12.599 18.4574 12.321C18.403 12.1608 18.3777 12.011 18.2979 11.8819C18.2236 11.7617 18.1006 11.6182 17.9791 11.4747L17.9521 11.4428C17.5516 10.968 17.0414 10.3553 16.609 9.82839C16.1946 9.32331 15.8524 8.89639 15.7181 8.78227C15.3989 8.51105 14.9468 8.21401 14.2686 8.21401H9.66755C9.62487 8.2067 9.53035 8.1911 9.41489 8.14943C8.91888 7.97045 7.88479 7.51948 7.36702 7.30995C6.21465 6.13586 5.35029 5.25332 4.77394 4.66235C4.72638 4.61361 4.61117 4.49397 4.42827 4.30347C4.20391 4.06978 3.83109 4.04594 3.57713 4.24907C3.32508 4.45067 3.28322 4.81013 3.48253 5.06133C5.29064 7.33994 6.21755 8.50276 6.2633 8.5498C6.37468 8.66433 6.70673 8.87699 7.11436 9.1439C7.53415 9.41875 8.03354 9.75 8.41755 10.0092C8.77511 10.2505 8.97606 10.3192 9.01596 10.655C9.10394 11.3955 9.21032 12.5105 9.33511 14H1.99468C0.893058 14 0 13.1326 0 12.0627V1.93727C0 0.867353 0.893058 0 1.99468 0H18.0053ZM15.7979 11.7915C15.9066 11.7819 16.0276 11.915 16.0771 11.9594C16.2486 12.1131 16.3003 12.1721 16.4096 12.2694C16.5691 12.4114 16.7331 12.5764 16.7553 12.6051C16.9727 12.99 17.2919 13.7639 17.4073 14L15.4654 14C15.5489 13.0617 15.6021 12.459 15.625 12.1919C15.6516 11.8819 15.6891 11.8011 15.7979 11.7915ZM12.4734 3.06088C11.1955 3.06088 10.1596 4.06699 10.1596 5.30811C10.1596 6.54922 11.1955 7.55534 12.4734 7.55534C13.7513 7.55534 14.7872 6.54922 14.7872 5.30811C14.7872 4.06699 13.7513 3.06088 12.4734 3.06088Z"
      fill={color}
      fillOpacity={opacity}
    />
  </svg>
);

const AssignmentsIcon = ({ color, opacity }: { color: string; opacity: number }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 14.1667H12.5" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round"/>
    <path d="M7.5 10.8333H12.5" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round"/>
    <path d="M7.5 7.5H8.33333" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round"/>
    <path d="M4.16667 5C4.16667 3.61929 5.28596 2.5 6.66667 2.5H10.9763C11.4183 2.5 11.8423 2.67559 12.1548 2.98816L15.3452 6.17851C15.6577 6.49107 15.8333 6.915 15.8333 7.35702V15C15.8333 16.3807 14.7141 17.5 13.3333 17.5H6.66667C5.28596 17.5 4.16667 16.3807 4.16667 15V5Z" stroke={color} strokeOpacity={opacity} strokeWidth="2"/>
    <path d="M10.8333 2.5V4.16667C10.8333 6.00762 12.3257 7.5 14.1667 7.5H15.8333" stroke={color} strokeOpacity={opacity} strokeWidth="2"/>
  </svg>
);

const ToolkitIcon = ({ color, opacity }: { color: string; opacity: number }) => (
  <svg width="20" height="20" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 15.5833C1 15.0308 1.21949 14.5009 1.61019 14.1102C2.00089 13.7195 2.5308 13.5 3.08333 13.5H14.3333M1 15.5833C1 16.1359 1.21949 16.6658 1.61019 17.0565C2.00089 17.4472 2.5308 17.6667 3.08333 17.6667H14.3333V1H3.08333C2.5308 1 2.00089 1.21949 1.61019 1.61019C1.21949 2.00089 1 2.5308 1 3.08333V15.5833Z" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LibraryIcon = ({ color, opacity }: { color: string; opacity: number }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.675 13.2417C17.1449 14.4954 16.3157 15.6002 15.2599 16.4594C14.2041 17.3187 12.954 17.9062 11.6187 18.1707C10.2834 18.4351 8.90369 18.3685 7.60013 17.9765C6.29656 17.5845 5.10886 16.8792 4.14086 15.9222C3.17285 14.9652 2.45402 13.7856 2.0472 12.4866C1.64039 11.1876 1.55797 9.80874 1.80717 8.47053C2.05637 7.13232 2.62959 5.87553 3.47671 4.81003C4.32384 3.74453 5.41907 2.90277 6.66667 2.35834" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.3333 10C18.3333 8.90567 18.1178 7.82204 17.699 6.81099C17.2802 5.79994 16.6664 4.88129 15.8926 4.10746C15.1187 3.33364 14.2001 2.71981 13.189 2.30102C12.178 1.88224 11.0943 1.66669 10 1.66669V10H18.3333Z" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SettingsIcon = ({ color, opacity }: { color: string; opacity: number }) => (
  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.13059 2.11753C5.13059 0.948052 6.07864 0 7.24812 0H8.46367C9.63315 0 10.5812 0.948052 10.5812 2.11753C10.5812 2.28702 10.6981 2.51314 10.9774 2.66485C11.0634 2.71153 11.1481 2.76008 11.2317 2.81043C11.5103 2.97838 11.7718 2.9676 11.9254 2.87974C12.9452 2.29622 14.2448 2.64444 14.8362 3.65968L15.4233 4.6673C16.0159 5.6845 15.6661 6.98971 14.6443 7.57435C14.4962 7.65912 14.3569 7.8747 14.3637 8.19552C14.3647 8.24136 14.3652 8.2873 14.3652 8.33333C14.3652 8.37937 14.3647 8.42533 14.3637 8.47118C14.3569 8.79199 14.4962 9.00757 14.6443 9.09233C15.6661 9.67696 16.0158 10.9822 15.4232 11.9993L14.8362 13.007C14.2447 14.0222 12.9452 14.3704 11.9253 13.7869C11.7718 13.6991 11.5103 13.6883 11.2317 13.8562C11.1481 13.9066 11.0634 13.9551 10.9774 14.0018C10.6981 14.1535 10.5812 14.3796 10.5812 14.5491C10.5812 15.7186 9.63315 16.6667 8.46367 16.6667H7.24812C6.07864 16.6667 5.13059 15.7186 5.13059 14.5491C5.13059 14.3796 5.01371 14.1535 4.73437 14.0018C4.64841 13.9551 4.56364 13.9066 4.4801 13.8562C4.20151 13.6883 3.93999 13.6991 3.78644 13.7869C2.76661 14.3704 1.46704 14.0222 0.875586 13.007L0.288551 11.9993C-0.304039 10.9821 0.0456779 9.67695 1.06746 9.09232C1.2156 9.00756 1.35488 8.79198 1.34809 8.47118C1.34712 8.42533 1.34664 8.37938 1.34664 8.33333C1.34664 8.2873 1.34712 8.24136 1.34809 8.19553C1.35488 7.87471 1.21559 7.65913 1.06744 7.57436C0.0456502 6.98972 -0.304069 5.68451 0.288528 4.66731L0.875544 3.65969C1.467 2.64444 2.76658 2.29623 3.78642 2.87975C3.93997 2.96761 4.2015 2.97839 4.4801 2.81044C4.56363 2.76008 4.64841 2.71153 4.73437 2.66485C5.01371 2.51314 5.13059 2.28702 5.13059 2.11753ZM7.24812 1.66667C6.99911 1.66667 6.79725 1.86853 6.79725 2.11753C6.79725 3.03924 6.20936 3.76038 5.5298 4.12945C5.46583 4.16419 5.40274 4.20032 5.34056 4.23781C4.67767 4.63742 3.75933 4.78445 2.95871 4.32636C2.73341 4.19745 2.44631 4.27438 2.31565 4.49866L1.72863 5.50628C1.60195 5.72374 1.67671 6.00277 1.89515 6.12775C2.69708 6.58659 3.03075 7.45724 3.01439 8.23077C3.01367 8.26486 3.0133 8.29905 3.0133 8.33333C3.0133 8.36763 3.01367 8.40183 3.01439 8.43592C3.03075 9.20945 2.69708 10.0801 1.89516 10.5389C1.67674 10.6639 1.60198 10.9429 1.72866 11.1604L2.31569 12.168C2.44635 12.3923 2.73344 12.4692 2.95873 12.3403C3.75935 11.8822 4.67768 12.0293 5.34057 12.4289C5.40274 12.4663 5.46584 12.5025 5.5298 12.5372C6.20936 12.9063 6.79725 13.6274 6.79725 14.5491C6.79725 14.7981 6.99911 15 7.24812 15H8.46367C8.71268 15 8.91454 14.7981 8.91454 14.5491C8.91454 13.6274 9.50243 12.9063 10.182 12.5372C10.246 12.5025 10.309 12.4663 10.3712 12.4289C11.0341 12.0293 11.9524 11.8822 12.7531 12.3403C12.9783 12.4692 13.2654 12.3923 13.3961 12.168L13.9831 11.1604C14.1098 10.9429 14.0351 10.6639 13.8166 10.5389C13.0147 10.0801 12.681 9.20946 12.6974 8.43593C12.6981 8.40184 12.6985 8.36764 12.6985 8.33333C12.6985 8.29904 12.6981 8.26485 12.6974 8.23077C12.681 7.45723 13.0147 6.58658 13.8166 6.12774C14.0351 6.00276 14.1098 5.72373 13.9832 5.50627L13.3961 4.49866C13.2655 4.27437 12.9784 4.19744 12.7531 4.32635C11.9525 4.78445 11.0341 4.63741 10.3712 4.2378C10.309 4.20032 10.246 4.16419 10.182 4.12945C9.50243 3.76038 8.91454 3.03924 8.91454 2.11753C8.91454 1.86853 8.71268 1.66667 8.46367 1.66667H7.24812Z"
      fill={color}
      fillOpacity={opacity}
    />
  </svg>
);

const CreateAssignmentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.63783 8.63783L6.18377 4H7.13246L8.6784 8.63783L13.3162 10.1838V11.1325L8.6784 12.6784L7.13246 17.3162H6.18377L4.63783 12.6784L0 11.1325V10.1838L4.63783 8.63783Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M13.3878 2.38783L14.1838 0H15.1325L15.9284 2.38783L18.3162 3.18377V4.13246L15.9284 4.9284L15.1325 7.31623H14.1838L13.3878 4.9284L11 4.13246V3.18377L13.3878 2.38783Z" fill="white"/>
  </svg>
);

const OutputLogoIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#303030"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M22.7271 28.3583C22.7271 28.3583 23.4545 30.3003 24.1212 30.4218H15.6969C13.9998 30.4218 12.485 29.4508 11.9997 27.6299L7.09074 13.0637C7.09074 13.0637 6.66669 11.3035 6 11.0001H14.6062C16.3033 11.0609 17.4548 11.6677 18.1215 13.9136L22.7271 28.3583Z" fill="white"/>
    <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M22.7271 28.3583C22.7271 28.3583 23.4545 30.3003 24.1212 30.4218H15.6969C13.9998 30.4218 12.485 29.4508 11.9997 27.6299L7.09074 13.0637C7.09074 13.0637 6.66669 11.3035 6 11.0001H14.6062C16.3033 11.0609 17.4548 11.6677 18.1215 13.9136L22.7271 28.3583Z" fill="url(#paint0_linear_2_10645)"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M17.3336 28.3585C17.3336 28.3585 16.6061 30.3005 15.9395 30.4221H24.3638C26.0609 30.4221 27.5756 29.4511 28.0609 27.6302L32.9096 13.0643C32.9096 13.0643 33.3336 11.3042 34.0003 11.0008H25.4545C23.7574 11.0008 22.6666 11.6076 22 13.8535L17.3336 28.3585Z" fill="white"/>
    <defs>
      <linearGradient id="paint0_linear_2_10645" x1="15.0606" y1="9.34907" x2="15.0606" y2="32.1338" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" stopOpacity="0"/>
        <stop offset="0.33" stopColor="white" stopOpacity="0"/>
        <stop offset="0.76" stopColor="#0E1513"/>
        <stop offset="1" stopColor="#0E1513"/>
      </linearGradient>
    </defs>
  </svg>
);

const NAV_ITEMS: NavItem[] = [
  { icon: HomeIcon, label: "Home", href: "/" },
  { icon: GroupsIcon, label: "My Groups", href: "/" },
  { icon: AssignmentsIcon, label: "Assignments", href: "/assignments" },
  { icon: ToolkitIcon, label: "AI Teacher's Toolkit", href: "/" },
  { icon: LibraryIcon, label: "My Library", href: "/" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const isOutput = pathname.startsWith("/assignments/output");

  const isActive = (label: string) => {
    if (label === "Assignments") {
      return pathname.startsWith("/assignments");
    }
    return false;
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 24,
        overflow: "hidden",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* ── Top Block (Frame 39962) ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 56, width: 254, margin: "0 auto", alignItems: "center" }}>
        {/* ── Logo ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            width: 251,
            height: 40,
          }}
        >
          <div
            style={{
              position: "relative",
              width: 40,
              height: 40,
              overflow: "hidden",
              flexShrink: 0,
              borderRadius: 15,
            }}
          >
            {isOutput ? (
              <OutputLogoIcon />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/logo 2.svg"
                alt="VedaAI logo"
                style={{
                  position: "absolute",
                  left: -19.7,
                  top: -1.85,
                  width: 80,
                  height: 71,
                  maxWidth: "none",
                }}
              />
            )}
          </div>
          <span className="sidebar-wordmark">VedaAI</span>
        </div>

        {/* ── Create Assignment button ── */}
        <button
          id="sidebar-create-btn"
          onClick={() => router.push("/assignments/create")}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 43px",
            gap: 10,
            width: 251,
            height: 42,
            background: "linear-gradient(#272727, #272727) padding-box, linear-gradient(180deg, #FF7243 0%, #C93D08 100%) border-box",
            border: "4px solid transparent",
            borderRadius: 100,
            cursor: "pointer",
            transition: "opacity 0.18s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
          }}
        >
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 20, height: 20 }}>
            <CreateAssignmentIcon />
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              lineHeight: "28px",
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              whiteSpace: "nowrap",
            }}
          >
            {isOutput ? "AI Teacher's Toolkit" : "Create Assignment"}
          </span>
        </button>

        {/* ── Nav items ── */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.label);
            const iconColor = active ? "#303030" : "#5E5E5E";
            const iconOpacity = active ? 1 : 0.8;
            return (
              <button
                key={item.label}
                id={`nav-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                onClick={() => router.push(item.href)}
                style={{
                  width: 254,
                  height: 40,
                  borderRadius: 8,
                  padding: "9px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: active ? "#EFEFEF" : "transparent",
                  color: active ? "#1A1A1A" : "#6B6B6B",
                  fontWeight: active ? 600 : 500,
                  fontSize: 14,
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.14s ease",
                  fontFamily: "inherit",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  if (!active)
                    (e.currentTarget as HTMLButtonElement).style.background = "#F7F7F7";
                }}
                onMouseLeave={(e) => {
                  if (!active)
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                <span
                  style={{
                    color: active ? "#1A1A1A" : "#7A7A7A",
                    display: "flex",
                    flexShrink: 0,
                  }}
                >
                  {item.icon({ color: iconColor, opacity: iconOpacity })}
                </span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    style={{
                      background: "#E8490F",
                      color: "#ffffff",
                      fontSize: 11,
                      fontWeight: 600,
                      borderRadius: 10,
                      padding: "0 6px",
                      minWidth: 20,
                      height: 20,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── Bottom Block (Frame 1984077460) ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 256, margin: "0 auto" }}>
        {/* ── Settings ── */}
        <button
          id="nav-settings"
          style={{
            width: 256,
            height: 38,
            borderRadius: 8,
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "transparent",
            color: "#6B6B6B",
            fontWeight: 500,
            fontSize: 14,
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "background 0.14s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background = "#F7F7F7")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
          }
        >
          <SettingsIcon color="#5E5E5E" opacity={0.8} />
          Settings
        </button>

        {/* ── School card ── */}
        <div
          style={{
            width: 256,
            height: 80,
            background: "#F0F0F0",
            borderRadius: 16,
            padding: 12,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          {/* Profile Info Row (232x56) */}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8, width: 232, height: 56 }}>
            {/* Avatar */}
            <div
              style={{
                width: 59,
                height: 56,
                borderRadius: 8,
                background: "linear-gradient(135deg, #f5a623, #e8490f)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 18,
              }}
            >
              🏫
            </div>
            <div style={{ display: "flex", flexDirection: "column", width: 165, height: 44, justifyContent: "center" }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#303030",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  height: 22,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Delhi Public School
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#5E5E5E",
                  height: 20,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Bokaro Steel City
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
