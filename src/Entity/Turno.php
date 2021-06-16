<?php

namespace App\Entity;

use App\Repository\TurnoRepository;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TurnoRepository::class)
 */
class Turno
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $horaInicio;

    /**
     * @ORM\Column(type="datetime")
     */
    private $horaFin;

    /**
     * @ORM\OneToOne(targetEntity=Evento::class, inversedBy="turno", cascade={"persist", "remove"})
     */
    private $evento;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHoraInicio(): ?DateTimeInterface
    {
        return $this->horaInicio;
    }

    public function setHoraInicio(DateTimeInterface $horaInicio): self
    {
        $this->horaInicio = $horaInicio;

        return $this;
    }

    public function getHoraFin(): ?DateTimeInterface
    {
        return $this->horaFin;
    }

    public function setHoraFin(DateTimeInterface $horaFin): self
    {
        $this->horaFin = $horaFin;

        return $this;
    }

    public function getEvento(): ?Evento
    {
        return $this->evento;
    }

    public function setEvento(?Evento $evento): self
    {
        $this->evento = $evento;

        return $this;
    }

    public function getEventos(): ?Evento
    {
        return $this->eventos;
    }

    public function setEventos(Evento $eventos): self
    {
        // set the owning side of the relation if necessary
        if ($eventos->getTurno() !== $this) {
            $eventos->setTurno($this);
        }

        $this->eventos = $eventos;

        return $this;
    }


}
