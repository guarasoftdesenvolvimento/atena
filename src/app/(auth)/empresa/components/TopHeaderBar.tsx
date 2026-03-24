"use client";

import React from "react";
import { Bell, Building2, ChevronDown } from "lucide-react";
import backofficeStyles from "../../backoffice/backoffice.module.css";

interface TopHeaderBarProps {
  title: string;
  hasNotifications?: boolean;
}

export default function TopHeaderBar({ title, hasNotifications = false }: TopHeaderBarProps) {
  return (
    <div className={backofficeStyles.topHeader}>
      <div className={backofficeStyles.topTitle}>{title}</div>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{ 
          backgroundColor: hasNotifications ? 'rgba(248,187,187,0.5)' : '#e9eef5', 
          padding: '8px', 
          borderRadius: '12px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}>
          <Bell size={24} color={hasNotifications ? "#d22020" : "#737791"} />
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          alignItems: 'center', 
          padding: '8px 12px', 
          backgroundColor: '#ffffff', 
          borderRadius: '16px',
          boxShadow: '0px 20px 50px 0px rgba(55, 69, 87, 0.1)',
          cursor: 'pointer'
        }}>
          <div style={{ backgroundColor: '#e9eef5', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 size={24} color="#527ca5" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 600, fontSize: '16px', color: '#527ca5', lineHeight: 1.2 }}>Guarásoft</span>
            <span style={{ fontSize: '11px', color: '#527ca5' }}>40.227.403/0001-92</span>
          </div>
          <ChevronDown size={20} color="#737791" />
        </div>
      </div>
    </div>
  );
}
