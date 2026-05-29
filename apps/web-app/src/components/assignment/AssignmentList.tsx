"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useAssignmentStore } from "@/store/assignmentStore";
import AssignmentCard from "@/components/assignment/AssignmentCard";
import AssignmentEmptyState from "@/components/assignment/AssignmentEmptyState";

export default function AssignmentList() {
  const assignments = useAssignmentStore((s) => s.assignments);
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = assignments.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  // Show empty state when there are no assignments at all
  if (assignments.length === 0) {
    return <AssignmentEmptyState />;
  }

  return (
    <div
      className="assignment-list"
      style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column" }}
    >

      {/* Scrollable content */}
      <div
        className="assignment-list__content"
        style={{ flex: 1, overflowY: "auto", paddingTop: 20, paddingBottom: 120 }}
      >
        <div className="assignment-list__mobile-bar">
          <button
            className="assignment-list__mobile-back"
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.7071 4.29289C11.0976 4.68342 11.0976 5.31658 10.7071 5.70711L5.41421 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H5.41421L10.7071 18.2929C11.0976 18.6834 11.0976 19.3166 10.7071 19.7071C10.3166 20.0976 9.68342 20.0976 9.29289 19.7071L2.29289 12.7071C1.90237 12.3166 1.90237 11.6834 2.29289 11.2929L9.29289 4.29289C9.68342 3.90237 10.3166 3.90237 10.7071 4.29289Z"
                fill="#303030"
              />
            </svg>
          </button>
          <div className="assignment-list__mobile-title">Assignments</div>
        </div>

        {/* Title — plain on grey background, no card */}
        <div
          className="assignment-list__title"
          style={{
            marginBottom: 12,
            paddingLeft: 8,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            className="assignment-list__title-dot"
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#4BC26D",
              border: "4px solid rgba(75, 194, 109, 0.4)",
              display: "inline-block",
              flexShrink: 0,
              boxShadow: "0px 16px 48px rgba(0,0,0,0.12), 0px 32px 48px rgba(0,0,0,0.2)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <h1
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#303030",
                lineHeight: "140%",
                letterSpacing: "-0.04em",
                fontFamily: "inherit",
              }}
            >
              Assignments
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 400,
                color: "rgba(94, 94, 94, 0.55)",
                lineHeight: "140%",
                letterSpacing: "-0.04em",
                fontFamily: "inherit",
              }}
            >
              Manage and create assignments for your classes.
            </p>
          </div>
        </div>


        {/* Card 2 — Filter row */}
        <div
          className="assignment-list__filter"
          style={{
            background: "#FFFFFF",
            borderRadius: 20,
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            height: 64,
            width: "100%",
            marginBottom: 14,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 16px",
            gap: 36,
            flex: "none",
            order: 1,
            alignSelf: "stretch",
            flexGrow: 0,
            zIndex: 4,
            boxSizing: "border-box",
          }}
        >
          <button
            id="filter-btn"
            className="assignment-list__filter-btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 700,
              color: "#A9A9A9",
              letterSpacing: "-0.04em",
              lineHeight: "140%",
              fontFamily: "inherit",
              padding: 0,
            }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 2.32153C0 1.03938 1.03938 0 2.32153 0H12.6785C13.9606 0 15 1.03938 15 2.32153C15 2.99412 14.7594 3.64453 14.3217 4.1552L11.9599 6.91062C11.0537 7.96787 10.5556 9.31442 10.5556 10.7069V12.5C10.5556 13.8807 9.43627 15 8.05556 15H6.94444C5.56373 15 4.44444 13.8807 4.44444 12.5V10.7069C4.44444 9.31442 3.94632 7.96787 3.04011 6.91062L0.678317 4.1552C0.240601 3.64453 0 2.99412 0 2.32153ZM2.32153 1.66667C1.95986 1.66667 1.66667 1.95986 1.66667 2.32153C1.66667 2.59627 1.76495 2.86195 1.94375 3.07054L4.30554 5.82597C5.47067 7.18529 6.11111 8.91657 6.11111 10.7069V12.5C6.11111 12.9602 6.48421 13.3333 6.94444 13.3333H8.05556C8.51579 13.3333 8.88889 12.9602 8.88889 12.5V10.7069C8.88889 8.91657 9.52933 7.18529 10.6945 5.82597L13.0563 3.07054C13.2351 2.86195 13.3333 2.59627 13.3333 2.32153C13.3333 1.95986 13.0401 1.66667 12.6785 1.66667H2.32153Z" fill="#A9A9A9"/>
            </svg>
            Filter By
          </button>

          <div className="assignment-list__search" style={{ position: "relative", width: 380 }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M9.16675 3.33335C5.94509 3.33335 3.33341 5.94503 3.33341 9.16669C3.33341 12.3883 5.94509 15 9.16675 15C12.3884 15 15.0001 12.3883 15.0001 9.16669C15.0001 5.94503 12.3884 3.33335 9.16675 3.33335ZM1.66675 9.16669C1.66675 5.02455 5.02461 1.66669 9.16675 1.66669C13.3089 1.66669 16.6667 5.02455 16.6667 9.16669C16.6667 13.3088 13.3089 16.6667 9.16675 16.6667C5.02461 16.6667 1.66675 13.3088 1.66675 9.16669Z" fill="#A9A9A9"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M13.5776 13.5775C13.903 13.252 14.4306 13.252 14.7561 13.5775L18.0894 16.9108C18.4149 17.2362 18.4149 17.7639 18.0894 18.0893C17.764 18.4147 17.2363 18.4147 16.9109 18.0893L13.5776 14.756C13.2521 14.4305 13.2521 13.9029 13.5776 13.5775Z" fill="#A9A9A9"/>
            </svg>
            <input
              className="assignment-list__search-input"
              id="assignment-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Assignment"
              style={{
                width: "100%",
                height: 44,
                paddingLeft: 44,
                paddingRight: 16,
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 700,
                color: "#A9A9A9",
                letterSpacing: "-0.04em",
                lineHeight: "140%",
                background: "#ffffff",
                outline: "none",
                fontFamily: "inherit",
                transition: "border-color 0.15s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "#E8490F")}
              onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "#E2E2E2")}
            />
          </div>
        </div>

        {/* Grid */}
        <div
          className="assignment-list__grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            paddingTop: 4,
          }}
        >
          {filtered.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      </div>

      {/* Bottom blur fade + centered button */}
      <div
        className="assignment-list__footer"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 110,
          background: "linear-gradient(to top, rgba(220,220,220,0.98) 30%, rgba(220,220,220,0) 100%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 24,
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <button
          className="assignment-list__footer-button"
          id="list-create-btn"
          onClick={() => router.push("/assignments/create")}
          style={{
            pointerEvents: "all",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            height: 46,
            padding: "0 28px",
            background: "linear-gradient(#1C1C1C, #1C1C1C) padding-box, linear-gradient(180deg, #FF7243 0%, #C93D08 100%) border-box",
            color: "#ffffff",
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "opacity 0.18s",
            boxShadow: "0 4px 20px rgba(0,0,0,0.22)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
          }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 7.49996C0 7.03972 0.373096 6.66663 0.833333 6.66663H14.1667C14.6269 6.66663 15 7.03972 15 7.49996C15 7.9602 14.6269 8.33329 14.1667 8.33329H0.833333C0.373096 8.33329 0 7.9602 0 7.49996Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M7.49992 -3.64262e-08C7.96016 -1.63085e-08 8.33325 0.373096 8.33325 0.833333L8.33325 14.1667C8.33325 14.6269 7.96016 15 7.49992 15C7.03968 15 6.66658 14.6269 6.66658 14.1667L6.66659 0.833333C6.66659 0.373096 7.03968 -5.65438e-08 7.49992 -3.64262e-08Z" fill="white"/>
          </svg>
          Create Assignment
        </button>
      </div>

      <button
        className="assignment-list__fab"
        aria-label="Create assignment"
        onClick={() => router.push("/assignments/create")}
      >
        <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 7.49996C0 7.03972 0.373096 6.66663 0.833333 6.66663H14.1667C14.6269 6.66663 15 7.03972 15 7.49996C15 7.9602 14.6269 8.33329 14.1667 8.33329H0.833333C0.373096 8.33329 0 7.9602 0 7.49996Z" fill="#FF5623"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M7.49992 -3.64262e-08C7.96016 -1.63085e-08 8.33325 0.373096 8.33325 0.833333L8.33325 14.1667C8.33325 14.6269 7.96016 15 7.49992 15C7.03968 15 6.66658 14.6269 6.66658 14.1667L6.66659 0.833333C6.66659 0.373096 7.03968 -5.65438e-08 7.49992 -3.64262e-08Z" fill="#FF5623"/>
        </svg>
      </button>

      <div className="assignment-list__mobile-nav" aria-hidden="true">
        <svg width="393" height="128" viewBox="0 0 393 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_dd_19_356)">
            <rect x="10" y="32" width="373" height="72" rx="24" fill="#181818" shapeRendering="crispEdges"/>
            <path d="M51 51.217C51 49.7164 52.2164 48.5 53.717 48.5H56.7736C58.2741 48.5 59.4906 49.7164 59.4906 51.217V54.2736C59.4906 55.7741 58.2741 56.9906 56.7736 56.9906H53.717C52.2164 56.9906 51 55.7741 51 54.2736V51.217Z" fill="white" fillOpacity="0.25"/>
            <path d="M60.5093 51.217C60.5093 49.7164 61.7257 48.5 63.2263 48.5H66.2829C67.7834 48.5 68.9998 49.7164 68.9998 51.217V54.2736C68.9998 55.7741 67.7834 56.9906 66.2829 56.9906H63.2263C61.7257 56.9906 60.5093 55.7741 60.5093 54.2736V51.217Z" fill="white" fillOpacity="0.25"/>
            <path d="M51 60.7265C51 59.226 52.2164 58.0095 53.717 58.0095H56.7736C58.2741 58.0095 59.4906 59.226 59.4906 60.7265V63.7831C59.4906 65.2837 58.2741 66.5001 56.7736 66.5001H53.717C52.2164 66.5001 51 65.2837 51 63.7831V60.7265Z" fill="white" fillOpacity="0.25"/>
            <path d="M60.5093 60.7265C60.5093 59.226 61.7257 58.0095 63.2263 58.0095H66.2829C67.7834 58.0095 68.9998 59.226 68.9998 60.7265V63.7831C68.9998 65.2837 67.7834 66.5001 66.2829 66.5001H63.2263C61.7257 66.5001 60.5093 65.2837 60.5093 63.7831V60.7265Z" fill="white" fillOpacity="0.25"/>
            <path d="M49.8952 82.5V74.58H51.4072V82.5H49.8952ZM44.6872 82.5V74.58H46.1992V82.5H44.6872ZM45.5392 79.104V77.856H50.4952V79.104H45.5392ZM55.4971 82.656C54.8811 82.656 54.3371 82.532 53.8651 82.284C53.3931 82.028 53.0211 81.656 52.7491 81.168C52.4851 80.672 52.3531 80.064 52.3531 79.344C52.3531 78.608 52.4891 78 52.7611 77.52C53.0411 77.032 53.4171 76.668 53.8891 76.428C54.3611 76.188 54.8931 76.068 55.4851 76.068C56.1011 76.068 56.6451 76.192 57.1171 76.44C57.5891 76.688 57.9611 77.06 58.2331 77.556C58.5051 78.044 58.6411 78.652 58.6411 79.38C58.6411 80.116 58.5051 80.728 58.2331 81.216C57.9611 81.704 57.5851 82.068 57.1051 82.308C56.6331 82.54 56.0971 82.656 55.4971 82.656ZM55.5571 81.504C55.8931 81.504 56.1771 81.428 56.4091 81.276C56.6411 81.116 56.8171 80.88 56.9371 80.568C57.0651 80.256 57.1291 79.884 57.1291 79.452C57.1291 78.996 57.0611 78.608 56.9251 78.288C56.7971 77.96 56.6091 77.708 56.3611 77.532C56.1211 77.356 55.8171 77.268 55.4491 77.268C55.1291 77.268 54.8491 77.348 54.6091 77.508C54.3691 77.66 54.1851 77.888 54.0571 78.192C53.9371 78.496 53.8771 78.872 53.8771 79.32C53.8771 80.024 54.0251 80.564 54.3211 80.94C54.6251 81.316 55.0371 81.504 55.5571 81.504ZM59.5222 82.5V78.528V76.224H60.7582L60.7222 78.144H60.9382C61.0502 77.68 61.1942 77.296 61.3702 76.992C61.5542 76.68 61.7782 76.448 62.0422 76.296C62.3062 76.144 62.6102 76.068 62.9542 76.068C63.3382 76.068 63.6542 76.156 63.9022 76.332C64.1502 76.508 64.3382 76.752 64.4662 77.064C64.6022 77.368 64.6862 77.724 64.7182 78.132H64.9102C65.0142 77.668 65.1622 77.284 65.3542 76.98C65.5542 76.676 65.7942 76.448 66.0742 76.296C66.3622 76.144 66.6782 76.068 67.0222 76.068C67.3582 76.068 67.6542 76.136 67.9102 76.272C68.1662 76.408 68.3782 76.608 68.5462 76.872C68.7222 77.128 68.8502 77.452 68.9302 77.844C69.0182 78.236 69.0622 78.688 69.0622 79.2V82.5H67.5382V79.392C67.5382 78.944 67.4982 78.572 67.4182 78.276C67.3462 77.98 67.2302 77.76 67.0702 77.616C66.9182 77.464 66.7182 77.388 66.4702 77.388C66.1902 77.388 65.9462 77.48 65.7382 77.664C65.5302 77.848 65.3662 78.108 65.2462 78.444C65.1262 78.772 65.0542 79.148 65.0302 79.572V82.5H63.5422V79.464C63.5422 79 63.5022 78.616 63.4222 78.312C63.3422 78 63.2222 77.768 63.0622 77.616C62.9022 77.464 62.6982 77.388 62.4502 77.388C62.1622 77.388 61.9142 77.484 61.7062 77.676C61.5062 78.868 61.3462 79.132 61.2262 79.468C61.1142 79.804 61.0502 80.18 61.0342 79.596V82.5H59.5222Z" fill="white" fillOpacity="0.25"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M147.667 49.1666C148.127 49.1666 148.5 49.5397 148.5 50H153.5C153.5 49.5397 153.873 49.1666 154.333 49.1666C154.794 49.1666 155.167 49.5397 155.167 50C157.468 50 159.333 51.8654 159.333 54.1666V61.6666C159.333 63.9678 157.468 65.8333 155.167 65.8333H146.833C144.532 65.8333 142.667 63.9678 142.667 61.6666V54.1666C142.667 51.8654 144.532 50 146.833 50C146.833 49.5397 147.206 49.1666 147.667 49.1666ZM146 55.8333C146 55.3731 146.373 55 146.833 55H155.167C155.627 55 156 55.3731 156 55.8333C156 56.2935 155.627 56.6666 155.167 56.6666H146.833C146.373 56.6666 146 56.2935 146 55.8333ZM153.5 61.6666C153.5 61.2064 153.873 60.8333 154.333 60.8333H155.167C155.627 60.8333 156 61.2064 156 61.6666C156 62.1269 155.627 62.5 155.167 62.5H154.333C153.873 62.5 153.5 62.1269 153.5 61.6666Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M242 49.5833C242 49.3532 241.813 49.1666 241.583 49.1666H238.667C236.826 49.1666 235.333 50.659 235.333 52.5V62.5C235.333 64.3409 236.826 65.8333 238.667 65.8333H245.333C247.174 65.8333 248.667 64.3409 248.667 62.5V56.25C248.667 56.0198 248.48 55.8333 248.25 55.8333H246.167C243.866 55.8333 242 53.9678 242 51.6666V49.5833ZM248.016 54.1666C248.293 54.1666 248.492 53.8991 248.359 53.656C248.246 53.4497 248.104 53.2586 247.934 53.0892L244.744 49.8989C244.575 49.7295 244.384 49.587 244.177 49.474C243.934 49.3409 243.667 49.54 243.667 49.8171V51.6666C243.667 53.0473 244.786 54.1666 246.167 54.1666H248.016ZM242 56.6666C242.46 56.6666 242.833 57.0397 242.833 57.5V59.1666H244.5C244.96 59.1666 245.333 59.5397 245.333 60C245.333 60.4602 244.96 60.8333 244.5 60.8333H242.833V62.5C242.833 62.9602 242.46 63.3333 242 63.3333C241.54 63.3333 241.167 62.9602 241.167 62.5V60.8333H239.5C239.04 60.8333 238.667 60.4602 238.667 60C238.667 59.5397 239.04 59.1666 239.5 59.1666H241.167V57.5C241.167 57.0397 241.54 56.6666 242 56.6666Z" fill="white" fillOpacity="0.25"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M327.638 56.1378L329.184 51.5H330.132L331.678 56.1378L336.316 57.6838V58.6325L331.678 60.1784L330.132 64.8162H329.184L327.638 60.1784L323 58.6325V57.6838L327.638 56.1378Z" fill="white" fillOpacity="0.25"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M336.388 49.8878L337.184 47.5H338.132L338.928 49.8878L341.316 50.6838V51.6325L338.928 52.4284L338.132 54.8162H337.184L336.388 52.4284L334 51.6325V50.6838L336.388 49.8878Z" fill="white" fillOpacity="0.25"/>
            <path d="M308.957 83.5L311.693 75.58H313.913L316.649 83.5H314.993L312.893 76.792H312.725L310.601 83.5H308.957ZM310.409 81.868V80.8H315.401V81.868H310.409ZM317.352 83.5V75.58H318.888V83.5H317.352ZM324.33 83.5V75.58H325.854V83.5H324.33ZM321.978 76.864V75.58H328.218V76.864H321.978ZM330.788 83.656C330.172 83.656 329.628 83.532 329.156 83.284C328.684 83.028 328.312 82.656 328.04 82.168C327.776 81.672 327.644 81.064 327.644 80.344C327.644 79.608 327.78 79 328.052 78.52C328.332 78.032 328.708 77.668 329.18 77.428C329.652 77.188 330.184 77.068 330.776 77.068C331.392 77.068 331.936 77.192 332.408 77.44C332.88 77.688 333.252 78.06 333.524 78.556C333.796 79.044 333.932 79.652 333.932 80.38C333.932 81.116 333.796 81.728 333.524 82.216C333.252 82.704 332.876 83.068 332.396 83.308C331.924 83.54 331.388 83.656 330.788 83.656ZM330.848 82.504C331.184 82.504 331.468 82.428 331.7 82.276C331.932 82.116 332.108 81.88 332.228 81.568C332.356 81.256 332.42 80.884 332.42 80.452C332.42 79.996 332.352 79.608 332.216 79.288C332.088 78.96 331.9 78.708 331.652 78.532C331.412 78.356 331.108 78.268 330.74 78.268C330.42 78.268 330.14 78.348 329.9 78.508C329.66 78.66 329.476 78.888 329.348 79.192C329.228 79.496 329.168 79.872 329.168 80.32C329.168 81.024 329.316 81.564 329.612 81.94C329.916 82.316 330.328 82.504 330.848 82.504ZM337.597 83.656C336.981 83.656 336.437 83.532 335.965 83.284C335.493 83.028 335.121 82.656 334.849 82.168C334.585 81.672 334.453 81.064 334.453 80.344C334.453 79.608 334.589 79 334.861 78.52C335.141 78.032 335.517 77.668 335.989 77.428C336.461 77.188 336.993 77.068 337.585 77.068C338.201 77.068 338.745 77.192 339.217 77.44C339.689 77.688 340.061 78.06 340.333 78.556C340.605 79.044 340.741 79.652 340.741 80.38C340.741 81.116 340.605 81.728 340.333 82.216C340.061 82.704 339.685 83.068 339.205 83.308C338.733 83.54 338.197 83.656 337.597 83.656ZM337.657 82.504C337.993 82.504 338.277 82.428 338.509 82.276C338.741 82.116 338.917 81.88 339.037 81.568C339.165 81.256 339.229 80.884 339.229 80.452C339.229 79.996 339.161 79.608 339.025 79.288C338.897 78.96 338.709 78.708 338.461 78.532C338.221 78.356 337.917 78.268 337.549 78.268C337.229 78.268 336.949 78.348 336.709 78.508C336.469 78.66 336.285 78.888 336.157 79.192C336.037 79.496 335.977 79.872 335.977 80.32C335.977 81.024 336.125 81.564 336.421 81.94C336.725 82.316 337.137 82.504 337.657 82.504ZM341.622 83.5V74.98H343.11V83.5H341.622ZM344.33 83.5V74.968H345.818V79.756C346.09 79.588 346.35 79.404 346.598 79.204C346.846 78.996 347.074 78.78 347.282 78.556C347.49 78.332 347.674 78.108 347.834 77.884C347.994 77.652 348.126 77.432 348.23 77.224H349.97C349.842 77.536 349.674 77.844 349.466 78.148C349.258 78.452 349.014 78.732 348.734 78.988C348.462 79.244 348.154 79.468 347.81 79.66C347.466 79.844 347.098 79.972 346.706 80.044V80.212C347.202 80.14 347.618 80.164 347.954 80.284C348.29 80.404 348.574 80.584 348.806 80.824C349.038 81.064 349.23 81.344 349.382 81.664C349.542 81.976 349.69 82.296 349.826 82.624L350.138 83.5H348.47L348.278 82.924C348.126 82.524 347.966 82.172 347.798 81.868C347.638 81.556 347.434 81.316 347.186 81.148C346.946 80.972 346.634 80.884 346.25 80.884H345.818V83.5H344.33ZM350.764 83.5V77.224H352.276V83.5H350.764ZM351.52 76.24C351.216 76.24 350.98 76.176 350.812 76.048C350.652 75.912 350.572 75.72 350.572 75.472C350.572 75.224 350.652 75.036 350.812 74.908C350.98 74.772 351.216 74.704 351.52 74.704C351.84 74.704 352.08 74.768 352.24 74.896C352.4 75.024 352.48 75.216 352.48 75.472C352.48 75.72 352.396 75.912 352.228 76.048C352.068 76.176 351.832 76.24 351.52 76.24ZM355.691 83.644C355.027 83.644 354.539 83.468 354.227 83.116C353.915 82.756 353.759 82.2 353.759 81.448V78.436H352.835L352.859 77.236H353.471C353.703 77.236 353.875 77.2 353.987 77.128C354.099 77.056 354.167 76.928 354.191 76.744L354.335 75.832H355.211V77.224H356.867V78.484H355.211V81.388C355.211 81.684 355.279 81.9 355.415 82.036C355.559 82.172 355.771 82.24 356.051 82.24C356.203 82.24 356.351 82.224 356.495 82.192C356.647 82.152 356.787 82.088 356.915 82V83.44C356.667 83.52 356.439 83.572 356.231 83.596C356.031 83.628 355.851 83.644 355.691 83.644Z" fill="white" fillOpacity="0.25"/>
          </g>
          <defs>
            <filter id="filter0_dd_19_356" x="-38" y="0" width="469" height="184" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="32"/>
              <feGaussianBlur stdDeviation="24"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_19_356"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="16"/>
              <feGaussianBlur stdDeviation="24"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
              <feBlend mode="normal" in2="effect1_dropShadow_19_356" result="effect2_dropShadow_19_356"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_19_356" result="shape"/>
            </filter>
          </defs>
        </svg>
        <div className="assignment-list__mobile-nav-actions" aria-hidden="false">
          <button
            className="assignment-list__mobile-nav-btn"
            type="button"
            onClick={() => router.push("/")}
            aria-label="Home"
          />
          <button
            className="assignment-list__mobile-nav-btn assignment-list__mobile-nav-btn--active"
            type="button"
            onClick={() => router.push("/assignments")}
            aria-label="Assignments"
          />
          <button
            className="assignment-list__mobile-nav-btn"
            type="button"
            disabled
            aria-label="Library"
          />
          <button
            className="assignment-list__mobile-nav-btn"
            type="button"
            disabled
            aria-label="AI Toolkit"
          />
        </div>
      </div>

      <style>{`
        .assignment-list__fab { display: none; }
        @media (min-width: 421px) {
          .assignment-list__mobile-bar { display: none; }
          .assignment-list__mobile-nav { display: none; }
        }
      `}</style>
    </div>
  );
}

