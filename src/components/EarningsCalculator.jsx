import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import './EarningsCalculator.css';

export default function EarningsCalculator({ onOpenProposal }) {
  const [daysPerWeek, setDaysPerWeek] = useState(6);
  const [hoursPerDay, setHoursPerDay] = useState(9);
  const [vehicleCategory, setVehicleCategory] = useState(419);

  const hourlyRate = vehicleCategory > 520 ? 45 : 38;
  const weeklyGross = daysPerWeek * hoursPerDay * hourlyRate;
  const fuelEstimate = daysPerWeek * 45;

  return (
    <section className="section calculator-section">
      <div className="container">
        <div className="glass-card calculator-card">
          <div className="calc-header">
            <div className="calc-badge">
              <Calculator size={18} />
              <span>Simulador de Ganhos</span>
            </div>
            <h2 className="calc-title">
              Calcule seu <span className="gradient-green">faturamento semanal</span>
            </h2>
            <p className="calc-subtitle">
              Simule quantas horas pretende trabalhar e veja quanto pode faturar com a Optimus Experience.
            </p>
          </div>

          <div className="calc-grid">
            <div className="calc-controls">
              <div className="control-group">
                <div className="control-label">
                  <span>Dias rodados por semana:</span>
                  <strong>{daysPerWeek} dias</strong>
                </div>
                <input 
                  type="range" 
                  min="4" 
                  max="7" 
                  value={daysPerWeek} 
                  onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                  className="calc-range"
                />
                <div className="range-marks">
                  <span>4 dias</span>
                  <span>5 dias</span>
                  <span>6 dias</span>
                  <span>7 dias</span>
                </div>
              </div>

              <div className="control-group">
                <div className="control-label">
                  <span>Horas por dia no app:</span>
                  <strong>{hoursPerDay} horas/dia</strong>
                </div>
                <input 
                  type="range" 
                  min="6" 
                  max="12" 
                  value={hoursPerDay} 
                  onChange={(e) => setHoursPerDay(Number(e.target.value))}
                  className="calc-range"
                />
                <div className="range-marks">
                  <span>6h</span>
                  <span>8h</span>
                  <span>10h</span>
                  <span>12h</span>
                </div>
              </div>

              <div className="control-group">
                <label className="control-label">
                  <span>Categoria do Veículo:</span>
                </label>
                <select 
                  value={vehicleCategory} 
                  onChange={(e) => setVehicleCategory(Number(e.target.value))}
                  className="calc-select"
                >
                  <option value={389}>Hatch Econômico (Onix Plus) - R$ 389/sem</option>
                  <option value={419}>Hatch Compacto (Polo Track) - R$ 419/sem</option>
                  <option value={549}>Sedan Premium (Corolla XEi) - R$ 549/sem</option>
                  <option value={679}>SUV Conforto (Compass Limited) - R$ 679/sem</option>
                  <option value={599}>Elétrico BYD Dolphin (Zero Combustível) - R$ 599/sem</option>
                  <option value={749}>SUV Premium (Corolla Cross GR) - R$ 749/sem</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
