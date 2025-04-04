import { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { useNavigate } from "react-router-dom";
import "../TabMenuNav/css/style.css"

export default function TabMenuNav() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { label: "Home", icon: "pi pi-home", command: () => navigate("/") },
    { label: "Treino", icon: "pi pi-list", command: () => navigate("/treino") },
  ];

  return (
    <div className="tab-menu-container">
      <div className="card">
        <TabMenu
          model={items}
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        />
      </div>
    </div>
  );
}
