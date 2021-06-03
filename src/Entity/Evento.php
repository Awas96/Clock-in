<?php

namespace App\Entity;

use App\Repository\EventoRepository;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=EventoRepository::class)
 */
class Evento
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     */
    private $fecha;


    /**
     * @ORM\OneToOne(targetEntity=Turno::class, inversedBy="evento", cascade={"persist", "remove"})
     */
    private $turno;

    /**
     * @ORM\OneToOne(targetEntity=Incidencia::class, inversedBy="evento", cascade={"persist", "remove"})
     */
    private $incidencia;

    /**
     * @ORM\ManyToOne(targetEntity=Usuario::class, inversedBy="evento")
     */
    private $usuario;

    /**
     * @ORM\OneToOne(targetEntity=Fichaje::class, inversedBy="evento", cascade={"persist", "remove"})
     */
    private $fichaje;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFecha(): ?DateTimeInterface
    {
        return $this->fecha;
    }

    public function setFecha(DateTimeInterface $fecha): self
    {
        $this->fecha = $fecha;

        return $this;
    }

    public function getFichaje(): ?Fichaje
    {
        return $this->fichaje;
    }

    public function setFichaje(?Fichaje $fichaje): self
    {
        $this->fichaje = $fichaje;

        return $this;
    }

    public function getTurno(): ?Turno
    {
        return $this->turno;
    }

    public function setTurno(?Turno $turno): self
    {
        $this->turno = $turno;

        return $this;
    }

    public function getIncidencia(): ?Incidencia
    {
        return $this->incidencia;
    }

    public function setIncidencia(?Incidencia $incidencia): self
    {
        $this->incidencia = $incidencia;

        return $this;
    }

    public function getUsuario(): ?Usuario
    {
        return $this->usuario;
    }

    public function setUsuario(?Usuario $usuario): self
    {
        $this->usuario = $usuario;

        return $this;
    }
}
