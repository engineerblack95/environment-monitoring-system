import React from 'react';

function SensorCard({ title, value, unit, classification, icon, trend }) {
  const accent = classification?.color || '#3b82f6';

  return (
    <div style={{
      position: 'relative',
      background: 'var(--surface)',
      borderRadius: 'var(--radius-lg)',
      padding: '22px 22px 20px',
      border: '1px solid var(--border-light)',
      boxShadow: 'var(--shadow)',
      overflow: 'hidden',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      minWidth: 0,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--shadow)';
    }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(90deg, ${accent}, ${accent}80)`,
      }} />

      {/* Header row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '10px',
            background: `${accent}1a`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
          }}>
            {icon}
          </div>
          <span style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--gray-500)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>
            {title}
          </span>
        </div>

        {classification && (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '3px 9px',
            borderRadius: 'var(--radius-pill)',
            background: `${classification.color}15`,
            color: classification.color,
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.02em',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: classification.color,
            }} />
            {classification.label}
          </span>
        )}
      </div>

      {/* Value */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '6px',
        marginBottom: '6px',
      }}>
        <span style={{
          fontSize: '38px',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'var(--gray-900)',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {value}
        </span>
        <span style={{
          fontSize: '15px',
          fontWeight: 500,
          color: 'var(--gray-400)',
        }}>
          {unit}
        </span>

        {trend === 'up' && (
          <span style={{
            marginLeft: 'auto',
            fontSize: '12px',
            color: 'var(--success)',
            fontWeight: 600,
          }}>↑</span>
        )}
        {trend === 'down' && (
          <span style={{
            marginLeft: 'auto',
            fontSize: '12px',
            color: 'var(--danger)',
            fontWeight: 600,
          }}>↓</span>
        )}
      </div>

      {/* Subtext */}
      <div style={{
        fontSize: '12.5px',
        color: 'var(--gray-400)',
        marginTop: '2px',
      }}>
        Live reading
      </div>
    </div>
  );
}

export default SensorCard;