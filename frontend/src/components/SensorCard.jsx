import React from 'react';

function SensorCard({ title, value, unit, classification, icon, trend }) {
  const accent = classification?.color || '#3b82f6';

  return (
    <div style={{
      position: 'relative',
      background: '#ffffff',
      borderRadius: 'var(--radius-lg)',
      padding: '22px 22px 20px',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow)',
      overflow: 'hidden',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      minWidth: 0,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-3px)';
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
        background: `linear-gradient(90deg, ${accent}, ${accent}66)`,
      }} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        left: '-40px',
        width: '150px',
        height: '150px',
        background: `radial-gradient(circle, ${accent}12 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Header row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: `${accent}12`,
            border: `1px solid ${accent}22`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '19px',
          }}>
            {icon}
          </div>
          <span style={{
            fontSize: '11.5px',
            fontWeight: 600,
            color: 'var(--text-tertiary)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
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
            fontSize: '10.5px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            border: `1px solid ${classification.color}33`,
          }}>
            <span style={{
              width: '5px',
              height: '5px',
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
        marginBottom: '4px',
        position: 'relative',
      }}>
        <span style={{
          fontSize: '40px',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {value}
        </span>
        <span style={{
          fontSize: '15px',
          fontWeight: 500,
          color: 'var(--text-tertiary)',
        }}>
          {unit}
        </span>

        {trend === 'up' && (
          <span style={{
            marginLeft: 'auto',
            fontSize: '13px',
            color: 'var(--success)',
            fontWeight: 700,
          }}>↑</span>
        )}
        {trend === 'down' && (
          <span style={{
            marginLeft: 'auto',
            fontSize: '13px',
            color: 'var(--danger)',
            fontWeight: 700,
          }}>↓</span>
        )}
      </div>

      <div style={{
        fontSize: '12px',
        color: 'var(--text-tertiary)',
        marginTop: '2px',
      }}>
        Live reading
      </div>
    </div>
  );
}

export default SensorCard;