<?php

namespace App\Entity;

use App\Repository\IncidenciaRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=IncidenciaRepository::class)
 */
class Incidencia
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $estado;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $motivo;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $justificacion;

    /**
     * @ORM\Column(type="datetime")
     */
    private $hora;

    /**
     * @ORM\ManyToOne(targetEntity=Evento::class, inversedBy="incidencia")
     * @ORM\JoinColumn(nullable=false)
     */
    private $evento;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEstado(): ?int
    {
        return $this->estado;
    }

    public function setEstado(int $estado): self
    {
        $this->estado = $estado;

        return $this;
    }

    public function getMotivo(): ?string
    {
        return $this->motivo;
    }

    public function setMotivo(string $motivo): self
    {
        $this->motivo = $motivo;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getHora()
    {
        return $this->hora;
    }

    /**
     * @param mixed $hora
     */
    public function setHora($hora): void
    {
        $this->hora = $hora;
    }


    /**
     * @return mixed
     */
    public function getJustificacion()
    {
        return $this->justificacion;
    }

    /**
     * @param mixed $justificacion
     */
    public function setJustificacion($justificacion): void
    {
        $this->justificacion = $justificacion;
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

}
